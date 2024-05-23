import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
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
import { Dashboard, DashboardCustomize, Home } from "@mui/icons-material";
import { CgInsights } from "react-icons/cg";
import { IoIosDocument } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import ProductCreate from "../Product";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#0f123b",
  color: "#fff",
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
  backgroundColor: "#0f123b",
  color: "#fff",
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
  backgroundColor: "#0f123b",
  color: "#fff",
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

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function LogOut() {
    localStorage.setItem("user", JSON.stringify(false));
    navigate("/login");
  }

  const handleMenuClick = (setting) => {
    if (setting === "Log out") {
      LogOut();
    } else if (setting === "Sign Up") {
      navigate("/signup");
    } else if (setting === "Dashboard") {
      navigate("/layout");
    }
    // else if (setting === "Products") {
    //   navigate("/products");
    // }
    else {
      handleCloseUserMenu();
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#0f123b",
        color: "#fff",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <NavLink>Pages / Dashboard</NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div
            className="avatar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginRight: "auto",
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 40, height: 40 }}
            />
            <Typography textAlign="center">{user.name}</Typography>
          </div>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#fff" }} />
        <List>
          {["Dashboard", "Products", "Sign Up", "Log out"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => handleMenuClick(text)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    {index === 0 && <Home />}
                    {index === 1 && <CgInsights />}
                    {index === 2 && <IoIosDocument />}
                    {index === 3 && <FaRocket />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider sx={{ backgroundColor: "#fff" }} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, color: "#fff", backgroundColor: "#0f123b" }}
      >
        <DrawerHeader />
        <Typography paragraph>
          <ProductCreate />
        </Typography>
      </Box>
    </Box>
  );
}
