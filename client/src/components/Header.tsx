import React, { useCallback, memo } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/State.Context';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { LocalUser } from '../utils/SetUser';

// Statics
import './Header.css';

const Header: React.FC = () => {
  const [{ user, cart }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(async () => {
    await LocalUser('shopifyToken', '');
    dispatch({ type: 'SET_USER', user: null });
    handleClose();
  }, [dispatch, handleClose]);

  return (
    <div className="header">
      <Link to="/">
        <h3 className="header__brand">Shopify</h3>
      </Link>
      <div className="header__ctx">
        {user !== null ? (
          <>
            <Button>
              <Link to="/cart">
                {cart.length ? (
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </Link>
            </Button>

            <Button onClick={handleClick}>
              <PersonIcon />
              Account
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem>
                <Link to="/orders">My Orders</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              {user.isAdmin && (
                <MenuItem>
                  <Link to="/admin">Admin</Link>
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/signup">New To Shopify</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
