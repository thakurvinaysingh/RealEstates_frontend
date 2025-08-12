import PropertyForm from '../../components/admin/properties/PropertyForm';
import Layout from '../../components/admin/layout/Layout';

const CreateProperty = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Create Property</h1>
          <p className="text-gray-500 mt-1">
            Add a new property to your investment portfolio
          </p>
        </div>
        <PropertyForm />
      </div>
    </Layout>
  );
};

export default CreateProperty;


// import PropertyForm from '../../components/admin/properties/PropertyForm';
// import Layout from '../../components/admin/layout/Layout';

// const CreateProperty = () => {
//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Create Property</h1>
//           <p className="text-muted-foreground mt-1">
//             Add a new property to your investment portfolio
//           </p>
//         </div>
//         <PropertyForm />
//       </div>
//     </Layout>
//   );
// };

// export default CreateProperty;