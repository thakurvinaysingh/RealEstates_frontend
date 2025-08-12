import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../api/admin';
import PropertyCard from '../../components/admin/properties/PropertyCard';
import LoadingSpinner from '../../components/admin/ui/LoadingSpinner';
import { useToast } from '../../components/hooks/use-toast';
import { Plus, Search, Grid3X3, List, Edit, Trash2 } from 'lucide-react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await apiService.getProperties();
      setProperties(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteProperty(id);
      setProperties(prev => prev.filter(property => property.id !== id));
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (property.propertyType || property.type || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Properties</h1>
          <p className="text-gray-500 mt-1">
            Manage your property investment portfolio
          </p>
        </div>
        <Link to="/admin/properties/create">
          <button className="bg-[#5927e3] text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </Link>
      </div>

      {/* Search & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-2 rounded ${viewMode === 'grid' ? 'bg-[#5927e3] text-white' : 'border'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            className={`px-3 py-2 rounded ${viewMode === 'table' ? 'bg-[#5927e3] text-white' : 'border'}`}
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow border p-8">
            <div className="max-w-md mx-auto">
              <div className="text-gray-500 text-lg mb-4">
                {searchTerm ? 'No properties found matching your search.' : 'No properties found.'}
              </div>
              <div className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'Create your first property to get started.'}
              </div>
              <Link to="/admin/properties/create">
                <button className="bg-[#5927e3] text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-500">Title</th>
                  <th className="text-left p-4 font-medium text-gray-500">Location</th>
                  <th className="text-left p-4 font-medium text-gray-500">Type</th>
                  <th className="text-left p-4 font-medium text-gray-500">Investors</th>
                  <th className="text-left p-4 font-medium text-gray-500">Invested</th>
                  <th className="text-left p-4 font-medium text-gray-500">Return</th>
                  <th className="text-left p-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.map((property) => {
                  const investors = property.investorsCount || property.investors || 0;
                  const invested = property.currentAmount || property.invested || 0;
                  const returnRate = property.annualReturn || property.returnRate || 0;
                  const propertyType = property.propertyType || property.type || 'Unknown';
                  
                  return (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{property.title}</div>
                      </td>
                      <td className="p-4 text-gray-500">{property.location}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                          {propertyType}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{investors}</td>
                      <td className="p-4 text-gray-500">{formatCurrency(invested)}</td>
                      <td className="p-4 text-gray-500">{returnRate}%</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/properties/edit/${property.id}`}>
                            <button className="px-2 py-1 border rounded hover:bg-gray-100">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { apiService } from '../../api/admin';
// import PropertyCard from '../../components/admin/properties/PropertyCard';
// import { Button } from '../../components/admin/ui/button';
// import { Input } from '../../components/admin/ui/input';
// import LoadingSpinner from '../../components/admin/ui/LoadingSpinner';
// import { useToast } from '../../components/hooks/use-toast';
// import { Plus, Search, Grid3X3, List, Edit, Trash2 } from 'lucide-react';

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const { toast } = useToast();

//   useEffect(() => {
//     loadProperties();
//   }, []);

//   const loadProperties = async () => {
//     try {
//       const data = await apiService.getProperties();
//       setProperties(data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to load properties',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await apiService.deleteProperty(id);
//       setProperties(prev => prev.filter(property => property.id !== id));
//       toast({
//         title: 'Success',
//         description: 'Property deleted successfully',
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete property',
//         variant: 'destructive',
//       });
//     }
//   };

//   const filteredProperties = properties.filter(property =>
//     property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (property.propertyType || property.type || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Properties</h1>
//           <p className="text-muted-foreground mt-1">
//             Manage your property investment portfolio
//           </p>
//         </div>
//         <Link to="/properties/create">
//           <Button className="bg-gradient-primary hover:opacity-90">
//             <Plus className="h-4 w-4 mr-2" />
//             Add Property
//           </Button>
//         </Link>
//       </div>

//       {/* Search & View Toggle */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Search properties..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 rounded-lg"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant={viewMode === 'grid' ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => setViewMode('grid')}
//           >
//             <Grid3X3 className="h-4 w-4" />
//           </Button>
//           <Button
//             variant={viewMode === 'table' ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => setViewMode('table')}
//           >
//             <List className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Content */}
//       {filteredProperties.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="bg-gradient-card rounded-xl shadow-card border border-border p-8">
//             <div className="max-w-md mx-auto">
//               <div className="text-muted-foreground text-lg mb-4">
//                 {searchTerm ? 'No properties found matching your search.' : 'No properties found.'}
//               </div>
//               <div className="text-muted-foreground mb-6">
//                 {searchTerm ? 'Try adjusting your search terms.' : 'Create your first property to get started.'}
//               </div>
//               <Link to="/properties/create">
//                 <Button className="bg-gradient-primary hover:opacity-90">
//                   <Plus className="h-4 w-4 mr-2" />
//                   Create Property
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : viewMode === 'grid' ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProperties.map((property) => (
//             <PropertyCard
//               key={property.id}
//               property={property}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="bg-gradient-card rounded-xl shadow-card border border-border overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-muted/50">
//                 <tr>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Investors</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Invested</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Return</th>
//                   <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {filteredProperties.map((property) => {
//                   const investors = property.investorsCount || property.investors || 0;
//                   const invested = property.currentAmount || property.invested || 0;
//                   const returnRate = property.annualReturn || property.returnRate || 0;
//                   const propertyType = property.propertyType || property.type || 'Unknown';
                  
//                   return (
//                     <tr key={property.id} className="hover:bg-muted/25">
//                       <td className="p-4">
//                         <div className="font-medium text-card-foreground">{property.title}</div>
//                       </td>
//                       <td className="p-4 text-muted-foreground">{property.location}</td>
//                       <td className="p-4">
//                         <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
//                           {propertyType}
//                         </span>
//                       </td>
//                       <td className="p-4 text-muted-foreground">{investors}</td>
//                       <td className="p-4 text-muted-foreground">{formatCurrency(invested)}</td>
//                       <td className="p-4 text-muted-foreground">{returnRate}%</td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <Link to={`/properties/edit/${property.id}`}>
//                             <Button variant="outline" size="sm">
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                           </Link>
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             onClick={() => handleDelete(property.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyList;