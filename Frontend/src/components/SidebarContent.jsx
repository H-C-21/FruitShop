import { IconButton } from "@mui/material"
import { MenuItem, SubMenu } from "react-pro-sidebar"
import { Link } from "react-router-dom"

import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { Sidebar, Menu} from "react-pro-sidebar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from '@mui/icons-material/Menu';

function SidebarContent(){
    return(
        <Menu>
              <IconButton sx={{visibility:"hidden"}}>
                <MenuIcon/>
              </IconButton>
              <MenuItem
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
              <MenuItem icon={<ReceiptRoundedIcon />}> Invoices </MenuItem>
              
              <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
                <MenuItem icon={<AccountBalanceRoundedIcon />}>
                  Current Wallet
                </MenuItem>
                <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
              </SubMenu>
              <MenuItem
                icon={<MonetizationOnRoundedIcon />}
              >
                Transactions
              </MenuItem>
              <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
                <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
              </SubMenu>
              <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
            </Menu>
    )
}

export default SidebarContent