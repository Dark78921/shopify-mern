import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ProductType } from '../../utils/types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AdminProducts = () => {
  // States
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Hooks
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get('/api/p');
      const products: ProductType[] = data.products;
      setProducts(products);
    })();
  }, []);

  // Functions
  const handleClick = () => setOpen(!open);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleDelete = async (id: string) => {
    await Axios.delete(`/api/p/${id}`);
    setProducts(products.filter((p) => p._id !== id));
    setOpenAlert(true);
  };

  return (
    <div className="admin__products">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {products.map((p) => (
            <ListItem key={p._id}>
              <ListItemAvatar>
                <Avatar>
                  <LoyaltyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${p.name.substring(0, 40)}...`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="link">
                  <Link to={`/s/${p._id}`}>
                    <LinkIcon />
                  </Link>
                </IconButton>
                <IconButton edge="end" aria-label="edit">
                  <Link to={`/admin/edit/${p._id}`}>
                    <EditIcon />
                  </Link>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(p._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sucessfully delete the product!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminProducts;
