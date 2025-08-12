import { Link } from 'react-router-dom';
import { Edit, Trash2, MapPin, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/button';

const PropertyCard = ({ property, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      onDelete(property.id);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const investors = property.investorsCount || property.investors || 0;
  const invested = property.currentAmount || property.invested || 0;
  const returnRate = property.annualReturn || property.returnRate || 0;
  const propertyType = property.propertyType || property.type || 'Unknown';

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/admin/properties/edit/${property.id}`}>
            <Button className="bg-[#5927e3] text-white" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            className="bg-red-600 text-white"
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 text-purple-600 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Investors</div>
            <div className="font-medium">{investors}</div>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-green-600 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Invested</div>
            <div className="font-medium">{formatCurrency(invested)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Return Rate</div>
            <div className="font-medium">{returnRate}%</div>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-yellow-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Time Left</div>
            <div className="font-medium">{property.timeLeft || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Progress & Type */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
          {propertyType}
        </span>
        <div className="flex items-center">
          <div className="text-sm text-gray-500 mr-2">
            {property.percent || 0}% funded
          </div>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#5927e3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(property.percent || 0, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;




// import { Link } from 'react-router-dom';
// import { Edit, Trash2, MapPin, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
// import { Button } from '../ui/button';

// const PropertyCard = ({ property, onDelete }) => {
//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       onDelete(property.id);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Use new schema fields with fallbacks to old fields for backward compatibility
//   const investors = property.investorsCount || property.investors || 0;
//   const invested = property.currentAmount || property.invested || 0;
//   const returnRate = property.annualReturn || property.returnRate || 0;
//   const propertyType = property.propertyType || property.type || 'Unknown';

//   return (
//     <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6 hover:shadow-elevated transition-all duration-200">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-card-foreground mb-1">
//             {property.title}
//           </h3>
//           <div className="flex items-center text-muted-foreground">
//             <MapPin className="h-4 w-4 mr-1" />
//             <span className="text-sm">{property.location}</span>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <Link to={`/properties/edit/${property.id}`}>
//             <Button variant="outline" size="sm">
//               <Edit className="h-4 w-4" />
//             </Button>
//           </Link>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={handleDelete}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="flex items-center">
//           <Users className="h-4 w-4 text-primary mr-2" />
//           <div>
//             <div className="text-sm text-muted-foreground">Investors</div>
//             <div className="font-medium">{investors}</div>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <DollarSign className="h-4 w-4 text-success mr-2" />
//           <div>
//             <div className="text-sm text-muted-foreground">Invested</div>
//             <div className="font-medium">{formatCurrency(invested)}</div>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <TrendingUp className="h-4 w-4 text-primary mr-2" />
//           <div>
//             <div className="text-sm text-muted-foreground">Return Rate</div>
//             <div className="font-medium">{returnRate}%</div>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <Clock className="h-4 w-4 text-warning mr-2" />
//           <div>
//             <div className="text-sm text-muted-foreground">Time Left</div>
//             <div className="font-medium">{property.timeLeft || 'N/A'}</div>
//           </div>
//         </div>
//       </div>

//       {/* Progress & Type */}
//       <div className="flex items-center justify-between">
//         <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
//           {propertyType}
//         </span>
//         <div className="flex items-center">
//           <div className="text-sm text-muted-foreground mr-2">
//             {property.percent || 0}% funded
//           </div>
//           <div className="w-16 bg-muted rounded-full h-2">
//             <div 
//               className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
//               style={{ width: `${Math.min(property.percent || 0, 100)}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyCard;