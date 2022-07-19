import React, { memo, useState, useCallback } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useStateValue } from '../context/State.Context';
import TextField from '@material-ui/core/TextField';
import useFormState from '../hooks/useFormState';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import checkout from '../utils/checkout';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { CartType } from '../utils/types';
// Statics
import './Cart.css';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Cart = () => {
  const history = useHistory();
  const [{ cart, user }, dispatch] = useStateValue();
  const [address, handleAdrress, resetAddress] = useFormState('');
  const [postalCode, handlePostal, resetPostalCode] = useFormState(0);
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const totalPrice = cart.reduce(
    (amount: any, item: { price: any }) => item.price + amount,
    checked ? 5 : 0
  );

  const handleClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpenAlert(false);
      setMsg('');
    },
    []
  );

  const removeFromBasket = useCallback(
    (id: string) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        id,
      });
    },
    [dispatch]
  );

  const handleCheckout = useCallback(
    async (token: string) => {
      if (user && address && postalCode) {
        for (let orderItem of cart) {
          const res = await checkout(
            orderItem.id,
            user,
            address,
            postalCode,
            orderItem.price,
            checked,
            token
          );
          // alert(res);
          setMsg(res);
          setOpenAlert(true);
        }
        resetAddress();
        resetPostalCode();
        dispatch({ type: 'EMPTY_CART' });
        history.push('/orders');
      }
    },
    [
      address,
      cart,
      checked,
      dispatch,
      history,
      postalCode,
      resetAddress,
      resetPostalCode,
      user,
    ]
  );

  return (
    <div className="cart">
      <div className="cart__left">
        {cart.length ? (
          <>
            {cart.map((c: CartType) => (
              <div className="cart__item" key={c.id}>
                <button onClick={() => removeFromBasket(c.id)}>X</button>
                <img src={c.image} alt={c.name} />
                <div className="cart__itemDetails">
                  <h5>{c.name}</h5>
                  <h6>${c.price}</h6>
                  <h6>Quatity: {c.qty}</h6>
                  {c.qty > c.inStock && (
                    <h6>
                      <strong>Out of Stock</strong>
                    </h6>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <h2>Look Like Empty</h2>
        )}
      </div>
      <div className="cart__right">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Proceed Checkout</h1>
          <TextField
            value={address}
            onChange={handleAdrress}
            margin="normal"
            label="Address"
            variant="outlined"
          />
          <TextField
            value={postalCode}
            type="number"
            onChange={handlePostal}
            label="Postal Code"
            margin="normal"
            variant="outlined"
          />
          <h3>
            Total Price:
            <strong> ${totalPrice}</strong>
          </h3>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                disabled={!cart.length}
                onChange={() => setChecked(!checked)}
                name="checkedA"
              />
            }
            label="Shipping Cost ($5)"
          />
          <StripeCheckout
            children={
              <Button
                variant="contained"
                color="primary"
                disabled={
                  !cart.length &&
                  (cart as CartType[]).every((c) => c.inStock > 0)
                }
              >
                Checkout with stripe!
              </Button>
            }
            token={({ id }) => {
              if (
                !cart.length &&
                (cart as CartType[]).every((c) => c.inStock > 0)
              ) {
                handleCheckout(id);
              }
            }}
            stripeKey="pk_test_51I5QvsF2iPpVWbtjhgK6siJ7bgNATSNmADtr6W2jADJ1ghELvpxtdUj4tYiHsQa96Bn6BphdbffG8Wuql0OMVbrw000qedq4PR"
            amount={totalPrice * 100}
            email={user.email}
          />
        </form>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(Cart);
