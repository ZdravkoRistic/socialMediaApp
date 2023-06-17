import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


function AppLayout() {
  return (
    <div className="App">
        <Navbar />
        <Outlet />
    </div>
  );
}

export default AppLayout;
