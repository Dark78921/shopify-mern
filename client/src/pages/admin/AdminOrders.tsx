import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { useStateValue } from '../../context/State.Context';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface P {
  varified: boolean;
  images: [string];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: [];
  avgRating: number;
  // __v: string
}

interface Order {
  product: P;
  user: string;
  address: string;
  postalCode: number;
  price: number;
  shippingPrice: boolean;
  _id: string;
  isDelivered: boolean;
}

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [{ user }] = useStateValue();
  const [openAlert, setOpenAlert] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data.orders);
    })();
    // eslint-disable-next-line
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleDelivery = async (userId: string, orderId: string) => {
    await Axios.put(
      `/api/orders/${userId}/${orderId}`,
      { isDelivered: true },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    // const updatedOrder: Order | undefined = orders.find(
    //   (o) => o._id === orderId
    // );
    // if (updatedOrder) {
    //   setOrders([...orders, { ...updatedOrder, isDelivered: true }]);
    // }
    setOpenAlert(true);
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Orders Placements" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {orders.map((o) => (
            <ListItem button key={o._id}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={`${o.product.name.substring(0, 40)}...`} />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={o.isDelivered}
                      onChange={() => handleDelivery(o.user, o._id)}
                    />
                  }
                  label="isDelivered"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Update the Order!
        </Alert>
      </Snackbar>
    </List>
  );
}
