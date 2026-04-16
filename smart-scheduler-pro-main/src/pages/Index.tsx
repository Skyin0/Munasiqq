import { useApp } from "@/contexts/AppContext";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Index = () => {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? <Dashboard /> : <Login />;
};

export default Index;
