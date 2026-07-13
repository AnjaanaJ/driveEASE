import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex">
      {/* Sidebar will go here in the next step */}
      <div className="flex-1">
        {/* Navbar will go here too */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;