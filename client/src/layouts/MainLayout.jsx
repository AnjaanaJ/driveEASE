import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      {/* Navbar will go here in the next step */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;