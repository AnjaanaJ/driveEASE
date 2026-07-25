import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

function AuthLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;