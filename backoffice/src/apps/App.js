import "../App.css";
import Navbar from "../layouts/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";
import Product from "../pages/product/Product";
import { Outlet, useNavigate } from "react-router-dom";
//  import BasicExampleDataGrid from "../pages/Listeclient";
// function App() {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="App">
//     {isOpen && <Sidebar setIsOpen={setIsOpen} />}

//       <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

//       <div style={{ paddingLeft: isOpen ? 300 : 0, paddingTop: 70 }}>

//         <br/><br/><br/>
//       {/* < BasicExampleDataGrid/> */}
//       </div>
//       <Footer isOpen={isOpen} />
//     </div>
//   );
// }

// export default App;

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { sidebarData } from "../constants/sidebarData";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { io } from "socket.io-client";
import { createContext } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
const drawerWidth = 240;
const socket = io("http://localhost:7000"); //path of the server

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,

  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export const SocketContext = createContext();
export default function App() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.me);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openCatalogueSubMenu, setOpenCatalogueSubMenu] = React.useState(false); // Déplacez la définition ici

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SocketContext.Provider value={socket}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            style={{ backgroundColor: "#f5f5f5", color: "black" }}
            className="d-flex justify-content-between "
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <div className="d-flex align-items-center justify-content-end w-100 gap-3 ">
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={2} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <p className="m-0">
                Welcome {user?.Employee?.nom + " " + user?.Employee?.prenom}{" "}
              </p>
              <Dropdown className="d-flex ">
                <Dropdown.Toggle
                  variant=""
                  id="dropdownMenu2"
                  className="d-flex gap-3 align-items-center"
                >
                  <img
                    src={user?.Employee?.image}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      window.location.pathname = "/profile";
                    }}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item>Setting</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.pathname = "/";
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ backgroundColor: "#00154f", flex: 1 }}>
            {sidebarData.map((elem, index) => (
              <React.Fragment key={index}>
                {elem.access.includes(user?.Employee.role) ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                        onClick={() => {
                          navigate(elem.path);
                          if (elem.title === "Catalogue") {
                            setOpenCatalogueSubMenu(!openCatalogueSubMenu);
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color: "#ffffff",
                          }}
                        >
                          {elem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={elem.title}
                          sx={{ opacity: open ? 1 : 0, color: "#ffffff" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {elem.title === "Catalogue" &&
                      openCatalogueSubMenu &&
                      elem.children && (
                        <List>
                          {elem.children.map((child, childIndex) => (
                            <ListItem
                              key={childIndex}
                              disablePadding
                              sx={{ display: "block" }}
                            >
                              <ListItemButton
                                sx={{
                                  minHeight: 48,
                                  justifyContent: open ? "initial" : "center",
                                  px: 4, // Ajustez le décalage selon vos besoins
                                }}
                                onClick={() => navigate(child.path)}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color: "#ffffff",
                                  }}
                                >
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={child.title}
                                  sx={{
                                    opacity: open ? 1 : 0,
                                    color: "#ffffff",
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      )}
                  </>
                ) : (
                  ""
                )}
              </React.Fragment>
            ))}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </SocketContext.Provider>
  );
}
