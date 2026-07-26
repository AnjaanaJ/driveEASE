import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer"

function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar will go here in the next step */}
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