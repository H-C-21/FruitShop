import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import MenuIcon from '@mui/icons-material/Menu';

const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
  useProSidebar();


  const App = () => {
    const { collapseSidebar } = useProSidebar();
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app">
          <Menu>
            <MenuItem
              icon={
                <MenuIcon
                  onClick={() => {
                    collapseSidebar();
                  }}
                />
              }
            >

            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    );
  };
  export default App;