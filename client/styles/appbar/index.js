import { IconButton, List, Typography } from "@mui/material";
import {styled} from "@mui/material/styles";
import { Box } from "@mui/system";
import { Colors, DrawerWidth } from "../theme";
import { textPopUpTop, textPopDown } from "../../animation";

export const AppbarContainer = styled(Box)(() => ({    
    display: 'flex',
    marginTop: 0,
    marginBotton: "20px",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px',
    overflow: "hidden",
    backgroundColor: '#fff',
    position: 'fixed', 
    top: 0, 
    width: "100%",
    boxShadow: "0px 0.2px 0px #b3dac2",
    zIndex: 1
}));

export const AppbarHeader = styled(Typography)(() => ({
  padding: "4px",
  flexGrow: 1,
  fontSize: "4em",
  fontFamily: 'sans-serif',
  color: Colors.secondary,
  "&:hover": {
    animation: `${textPopUpTop} 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
  },
  "&:not(:hover)": {
    animation: `${textPopDown} 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
  },
  textDecoration: "none",
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: 99,  
  borderTop: `1px solid ${Colors.border}`
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));

export const MyList = styled(List)(({ type }) => ({
    display: type === "row" ? "flex" : "block",
    flexGrow: 3,
  justifyContent: "center",
  alignItems: "center",
}));



export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  left: DrawerWidth,
  zIndex: 1999,      
}));