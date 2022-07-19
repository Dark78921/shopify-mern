import React, { useEffect, useState, memo } from 'react';
import Axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ErrorScreen from '../components/ErrorScreen';
import CarouselBar from '../components/Carousel';
import { ProductType } from '../utils/types';

// Statics
import './Home.css';

const Home = () => {
  // States
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<null | string>(null);

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get('/api/p');
        if (!data.products) throw new Error(data.error);
        const products: ProductType[] = data.products;
        setProducts(products.filter((p) => p.price < 100));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {!error ? (
        <div className="home">
          <div className="home__carousel">
            <CarouselBar />
          </div>
          <div className="home__productLabel">
            <h2>Best Deals</h2>
            <Link to="/s">View all</Link>
          </div>
          <div className="home__productLists">
            {products.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        </div>
      ) : (
        <ErrorScreen errMsg={error} />
      )}
    </>
  );
};

export default memo(Home);
