import Axios from 'axios';

export default async (
  productID: string,
  user: any,
  address: string,
  postalCode: number,
  price: number,
  shippingPrice: boolean,
  token: string
) => {
  const orderData = {
    token,
    shipments: {
      address,
      postalCode,
    },
    user: user.id,
    product: productID,
    shippingPrice: shippingPrice ? 5 : 0,
    totalPrice: price,
  };
  const { data } = await Axios.post(`/api/orders/${user.id}`, orderData, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  if (!data.error) {
    return 'Order Placed!';
  } else {
    return data.error;
  }
};
