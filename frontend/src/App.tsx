import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     <AppRoutes />
  //   </div>
  // );
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
};

export default App;