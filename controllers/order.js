import Order from '../model/Order.js';
import Payment from '../model/Payment.js';
import User from '../model/User.js';
import { ExpressError } from '../utils/ExpressError.js';
import stripe from '../utils/stripe.js';

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('product');
  if (!orders) {
    throw new ExpressError('Server Error!', 500);
  }
  res.json({
    success: true,
    length: orders.length,
    orders,
  });
};

export const getUsersOrders = async (req, res) => {
  const orders = await Order.find({})
    .where({ user: req.params.uid })
    .populate('product');

  if (!orders) {
    throw new ExpressError('No Orders for given users', 500);
  }

  res.json({
    success: true,
    length: orders.length,
    orders,
  });
};

export const createUserOrder = async (req, res) => {
  const {
    token,
    user,
    product,
    shipments,
    shippingPrice,
    totalPrice,
  } = req.body;
  const orderUser = await User.findOne({ _id: req.params.uid });
  if (!orderUser) throw new ExpressError('User Not Found!', 500);
  const order = new Order({
    user,
    product,
    shipments,
    shippingPrice,
    totalPrice,
  });
  if (!order) throw new ExpressError('Server Error!', 500);
  await order.save();

  const customerCharge = await stripe.charges.create({
    amount: order.totalPrice * 100,
    currency: 'inr',
    source: token,
    description: `Shopify payment | order_id: ${order._id}`,
  });

  const payment = new Payment({
    orderId: order._id,
    stripeId: customerCharge.id,
  });
  await payment.save();

  if (payment.orderId.equals(order._id)) {
    order.set({
      user: orderUser._id,
      isPaid: true,
      paymentId: payment._id,
    });
    await order.save();

    console.log(JSON.stringify(order, null, 2));

    res.json({
      success: true,
      length: order.length,
      order,
    });
  }
};

export const editUserOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.params.uid });
  if (!user) throw new ExpressError('User Not Found!', 500);
  const order = await Order.findOneAndUpdate(
    { _id: req.params.oID },
    { ...req.body }
  );
  if (!order) throw new ExpressError('Server Error!', 500);

  res.json({
    success: true,
    length: order.length,
    order,
  });
};

export const deleteUserOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.params.uid });
  if (!user) throw new ExpressError('User Not Found!', 500);
  const order = await Order.findOne({ _id: req.params.oID });

  if (order.user.equals(user._id)) {
    await order.remove();
    res.json({
      success: true,
      msg: 'Successfully deleted',
    });
  } else {
    throw new ExpressError('Unauthorized', 500);
  }
};
