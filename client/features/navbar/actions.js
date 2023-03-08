import { Divider, ListItemButton, ListItemIcon} from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import People from "@mui/icons-material/People";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import React from 'react';
import { logout } from '../../app/store';
import { deleteCartState, fetchCart, selectCart } from '../cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

export default function Actions({ matches }) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const userId = useSelector((state) => state.auth.me.id);
  const cart = useSelector(selectCart)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(fetchCart(userId))
    dispatch(deleteCartState())
    navigate('/login');
   };
  return (
    <div>
        {isLoggedIn && isAdmin ? (<Component>
      <MyList type="row">
      <Divider orientation="vertical" flexItem />
      <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='All Users' to="/users">
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <People />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='My Cart' to={`/users/${userId}/cart`}>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <Link title='My Account' to={`/users/${userId}`}><ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <PersonIcon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='Sign Out' onClick={logoutAndRedirectHome} to='/login'>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <Logout />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component>) : isLoggedIn ? (<Component>
      <MyList type="row">
      <Divider orientation="vertical" flexItem />
      <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='My Cart' to={`/users/${userId}/cart`}>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <Link title='My Account' to={`/users/${userId}`}><ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <PersonIcon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='Sign Out' onClick={logoutAndRedirectHome} to='/login'>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <Logout />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component>) : (<Component>
      <MyList type="row">
      <Divider orientation="vertical" flexItem />
      <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='My Cart' href={`http://localhost:8080/guest/cart`}>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='Sign Up'  to="/signup">
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <PersonAddAlt1Icon />
          </ListItemIcon></Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        ><Link title='Sign In'  to="/login">
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <Login />
          </ListItemIcon>
          </Link>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
      </Component>
      )}
    </div>  
  );
}

