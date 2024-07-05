import { Outlet } from "react-router-dom";

const Main = ({ isSearchOpen }) => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Main;
