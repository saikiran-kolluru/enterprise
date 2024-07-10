import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwipeableDrawer, ListItem, ListItemButton, List, ListItemIcon, ListItemText,Box } from '@mui/material';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

type DrawerProps = {
    open?: boolean;
    handleClose: ()=> void;
}
const Drawer: FC<DrawerProps> = ({ open, handleClose }) => {
    const navigate = useNavigate();
    const showListItems = () => {
        return <Box sx={{ color: 'white', width: 400 }}>
            <List>
                <ListItem>
                    <ListItemButton onClick={()=>{navigate("/cars")}}>
                        <ListItemIcon>
                            <TimeToLeaveIcon sx={{ color: "black" }}></TimeToLeaveIcon>
                        </ListItemIcon>
                        <ListItemText sx={{ color: "black" }}>
                            Car
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={()=>{navigate("/trucks")}}>
                        <ListItemIcon>
                            <LocalShippingIcon sx={{ color: "black" }}></LocalShippingIcon>
                        </ListItemIcon>
                        <ListItemText sx={{ color: "black" }}>
                            Truck
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>;
    };
    return (
        <Box sx={{height:"100",backgroundColor:"blue",mb:4}}>
            <SwipeableDrawer
                onOpen={() => {
                    console.log('on open');
                }}
                onClose={() => {
                  handleClose()
                }}
                open={open}
            >
                {showListItems()}
            </SwipeableDrawer>
        </Box>
    );
};

export default Drawer;
