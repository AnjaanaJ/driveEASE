import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer"
import Sidebar from "../components/shared/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      <div className="flex-1 flex-col">
        {/* Navbar will go here too */}
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default DashboardLayout;