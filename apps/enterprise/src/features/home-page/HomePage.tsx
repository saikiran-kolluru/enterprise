import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '../../components/Drawer/Drawer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
const HomePage = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Box sx={{ bgcolor: 'grey', padding: 2, borderRadius: 2 }}>
        <MenuIcon
          onClick={() => {
            setOpen(!open);
          }}
        ></MenuIcon>
      </Box>

      <Drawer open={open} handleClose={handleClose}></Drawer>
      <Outlet></Outlet>
    </div>
  );
};
export default HomePage;
