"use client";
import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  Mail,
  Menu,
  SvgIconComponent,
} from "@mui/icons-material";
import {
  Box,
  CSSObject,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { NextPage } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

interface Props {
  children: React.ReactNode;
}

export const Navbar: NextPage<Props> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const sections = [
    { text: "Inicio", path: "/", icon: Inbox },
    { text: "Inventario", path: "/inventory", icon: Mail },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
            <Menu />
          </IconButton>
          <Box display="flex" alignItems="center" gap={1}>
            <Image
              src="/assets/icons/logo.svg"
              alt="Logo"
              width={48}
              height={48}
            />
            <Typography variant="body2" noWrap component="div">
              iStock
            </Typography>
          </Box>
          <Box flex={1} />
          <IconButton>
            <Image
              src="/assets/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sections.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Section
                open={open}
                text={item.text}
                path={item.path}
                Icon={item.icon}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

interface SectionProps {
  open: boolean;
  text: string;
  path: string;
  Icon: SvgIconComponent;
}

const Section: NextPage<SectionProps> = ({ open, text, path, Icon }) => {
  const pathname = usePathname();
  const selected = pathname === path;

  return (
    <ListItemButton
      component={Link}
      href={path}
      passHref
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        background: selected ? "#DBF8E5" : "none",
        color: selected ? "secondary.main" : "primary.main",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        <Icon color={selected ? "secondary" : "primary"} />
      </ListItemIcon>
      <ListItemText
        primary={text}
        sx={{
          opacity: open ? 1 : 0,
        }}
      />
    </ListItemButton>
  );
};
