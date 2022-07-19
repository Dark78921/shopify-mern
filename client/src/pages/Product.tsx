import React, { useEffect, useState, memo, useCallback } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProductReviews from '../components/ProductReviews';
import ErrorScreen from '../components/ErrorScreen';
import { useStateValue } from '../context/State.Context';
import Loaders from '../components/Loaders';
import { ReviewTypes, ProductType } from '../utils/types';

// Statics
import './Product.css';
interface RouterProps {
  pID: string;
}

const Product: React.FC = () => {
  const { pID } = useParams<RouterProps>();
  const [, dispatch] = useStateValue();
  // States
  const [product, setProduct] = useState<ProductType>();
  const [reviews, setReviews] = useState<ReviewTypes[] | []>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(`/api/p/${pID}`);
        if (!data.product) throw new Error(data.error);
        setLoading(false);
        const productData: ProductType = { ...data.product };
        setReviews(productData.reviews);
        setProduct(productData);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    })();
  }, [pID]);

  // Functions
  const addToCart = useCallback(() => {
    // const data = { id: product?._id, qty: 1 };
    const data = {
      id: product?._id,
      name: product?.name,
      inStock: product?.countInStock,
      price: product?.price,
      image: product?.images[0],
      qty: 1,
    };
    dispatch({ type: 'ADD_TO_CART', item: data });
  }, [dispatch, product]);

  return (
    <>
      {loading ? (
        <Loaders />
      ) : (
        <>
          {product ? (
            <div className="product">
              <div className="product__details">
                <div className="product__left">
                  <img src={product.images[0]} alt="" />
                </div>
                <div className="product__right">
                  <p className="product__name">{product.name}</p>
                  <p className="product__category">{product.category}</p>
                  <p className="product__price">
                    ${product.price}{' '}
                    <span className="product__taxes">Incl. taxes</span>
                  </p>
                  <p className="product__desc">{product.description}</p>
                  <div className="product__addBasket">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={addToCart}
                    >
                      ADD TO BAG
                    </Button>
                    <p className="product__deleveryPin">Delivery Details</p>
                    <TextField
                      label="Pincode"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <p className="product__deleveryAdOns">
                      <span>$</span> Cash on Delivery might be available
                    </p>
                  </div>
                </div>
              </div>

              <ProductReviews reviews={reviews} productId={product._id} />

              <div className="product__dummy">
                <div className="dummy__left">
                  <div className="dummy__context">
                    <h4 className="dummy__head">PRODUCT DESCRIPTION</h4>
                    <p className="dummy__body">
                      This Official Shopify is what you need to be motivated to
                      work. Pair it with comfy bottoms to attend all your
                      virtual meetings in style.
                    </p>
                  </div>
                  <div className="dummy__context">
                    <h4 className="dummy__head">REGULAR FIT</h4>
                    <p className="dummy__body">
                      Fits just right - not too tight, not too loose.
                    </p>
                  </div>
                </div>
                <div className="dummy__right">
                  <div className="dummy__context">
                    <h4 className="dummy__head">SHOPIFY COINS INFO</h4>
                    <p className="dummy__body">
                      Shopify coins cannot be redeemed on already discounted
                      products
                    </p>
                  </div>
                  <div className="dummy__context">
                    <h4 className="dummy__head">15 DAY RETURNS</h4>
                    <p className="dummy__body">
                      If you arent satisfied with this product, return it for a
                      refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ErrorScreen errMsg={error} />
          )}
        </>
      )}
    </>
  );
};

export default memo(Product);
