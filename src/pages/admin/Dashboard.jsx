import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../api/admin';
import { Building2, DollarSign, TrendingUp, Users, Plus, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../../components/admin/ui/LoadingSpinner';
import { useToast } from '../../components/hooks/use-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of your property investment portfolio
          </p>
        </div>
        <Link to="/admin/properties/create">
          <button className="bg-[#5927e3] text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalProperties || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats?.totalInvested || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg. Return Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.averageReturnRate?.toFixed(1) || 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Investors</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.activeInvestors || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/properties/create"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <Plus className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Add New Property</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </Link>

          <Link
            to="/admin/properties"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">View All Properties</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </Link>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-500">Analytics</span>
            </div>
            <span className="text-xs text-gray-500">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No recent activity to display. Create your first property to get started.
          </p>
          <Link to="/admin/properties/create" className="mt-4 inline-block">
            <button className="bg-[#5927e3] text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Property
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { apiService } from '../../api/admin';
// import { Building2, DollarSign, TrendingUp, Users, Plus, ArrowRight } from 'lucide-react';
// import { Button } from '../../components/admin/ui/button';
// import LoadingSpinner from '../../components/admin/ui/LoadingSpinner';
// import { useToast } from '../../components/hooks/use-toast';

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const data = await apiService.getDashboardStats();
//       setStats(data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to load dashboard statistics',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//           <p className="text-muted-foreground mt-1">
//             Overview of your property investment portfolio
//           </p>
//         </div>
//         <Link to="/admin/properties/create">
//           <Button className="bg-gradient-primary hover:opacity-90">
//             <Plus className="h-4 w-4 mr-2" />
//             Add Property
//           </Button>
//         </Link>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-primary/10 rounded-lg">
//               <Building2 className="h-6 w-6 text-primary" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-muted-foreground">Total Properties</p>
//               <p className="text-2xl font-bold text-card-foreground">
//                 {stats?.totalProperties || 0}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-success/10 rounded-lg">
//               <DollarSign className="h-6 w-6 text-success" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-muted-foreground">Total Invested</p>
//               <p className="text-2xl font-bold text-card-foreground">
//                 {formatCurrency(stats?.totalInvested || 0)}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-primary/10 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-primary" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-muted-foreground">Avg. Return Rate</p>
//               <p className="text-2xl font-bold text-card-foreground">
//                 {stats?.averageReturnRate?.toFixed(1) || 0}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-warning/10 rounded-lg">
//               <Users className="h-6 w-6 text-warning" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-muted-foreground">Active Investors</p>
//               <p className="text-2xl font-bold text-card-foreground">
//                 {stats?.activeInvestors || 0}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//         <h2 className="text-xl font-semibold text-card-foreground mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Link
//             to="/properties/create"
//             className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
//           >
//             <div className="flex items-center">
//               <Plus className="h-5 w-5 text-primary mr-3" />
//               <span className="font-medium">Add New Property</span>
//             </div>
//             <ArrowRight className="h-4 w-4 text-muted-foreground" />
//           </Link>

//           <Link
//             to="/properties"
//             className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
//           >
//             <div className="flex items-center">
//               <Building2 className="h-5 w-5 text-primary mr-3" />
//               <span className="font-medium">View All Properties</span>
//             </div>
//             <ArrowRight className="h-4 w-4 text-muted-foreground" />
//           </Link>

//           <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
//             <div className="flex items-center">
//               <TrendingUp className="h-5 w-5 text-muted-foreground mr-3" />
//               <span className="font-medium text-muted-foreground">Analytics</span>
//             </div>
//             <span className="text-xs text-muted-foreground">Coming Soon</span>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//         <h2 className="text-xl font-semibold text-card-foreground mb-4">
//           Recent Activity
//         </h2>
//         <div className="text-center py-8">
//           <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//           <p className="text-muted-foreground">
//             No recent activity to display. Create your first property to get started.
//           </p>
//           <Link to="/properties/create" className="mt-4 inline-block">
//             <Button variant="outline">
//               <Plus className="h-4 w-4 mr-2" />
//               Create Property
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;