import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 240;

export interface AppBarProps {
  children: React.ReactNode;
}

const AppBarAndDrawer: React.FC<AppBarProps> = (props) => {
  const { children } = props;
  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <MuiAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Video Imagery Viewer
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{children}</Box>
      </Drawer>
    </Box>
  );
};

export default AppBarAndDrawer;
