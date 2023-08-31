
import { Link } from "react-router-dom";

import{useDispatch} from "react-redux";
import SidebarContent from "./SidebarContent";
import { Sidebar } from "react-pro-sidebar";

const SideBar = () => {

    const dispatch = useDispatch();

    return (
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar className="app">
            <SidebarContent/>
          </Sidebar>
        </div>
      );
  };
  export default SideBar;