import { useParams } from 'react-router-dom';
import PropertyForm from '../../components/admin/properties/PropertyForm';
import Layout from '../../components/admin/layout/Layout';

const EditProperty = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Edit Property</h1>
          <p className="text-gray-500 mt-1">
            Update property information and details
          </p>
        </div>
        <PropertyForm propertyId={id} isEdit={true} />
      </div>
    </Layout>
  );
};

export default EditProperty;


// import { useParams } from 'react-router-dom';
// import PropertyForm from '../../components/admin/properties/PropertyForm';
// import Layout from '../../layouts/DashboardLayout';

// const EditProperty = () => {
//   const { id } = useParams();

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Edit Property</h1>
//           <p className="text-muted-foreground mt-1">
//             Update property information and details
//           </p>
//         </div>
//         <PropertyForm propertyId={id} isEdit={true} />
//       </div>
//     </Layout>
//   );
// };

// export default EditProperty;