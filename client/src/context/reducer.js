export const initialState = {
  cart: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'ADD_TO_CART':
      const item = action.item;
      const inCart = state.cart.filter((c) => c.id === item.id);
      let newCart;
      if (inCart) {
        newCart = {
          ...state,
          cart: [...state.cart, { ...item, qty: item.qty++ }],
        };
      } else {
        newCart = {
          ...state,
          cart: [...state.cart, item],
        };
      }
      return newCart;

    case 'REMOVE_FROM_CART':
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      let newBasket = [...state.cart];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        cart: newBasket,
      };

    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
