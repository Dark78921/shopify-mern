import React, { useEffect, useState, memo } from 'react';
import Axios from 'axios';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import ProductCard from '../components/ProductCard';
import ErrorScreen from '../components/ErrorScreen';
import { ProductType } from '../utils/types';
import SearchBar from '../components/SearchBar';

// Statics
import './Shops.css';

const Shops = () => {
  // States
  const [items, setItems] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get('/api/p');
        const products: ProductType[] = data.products;
        setItems(products);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {items ? (
        <div className="shops">
          <div className="shops_category">
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button selected>
                  <ListItemText primary="Electronics" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Clothes" />
                </ListItem>
              </List>
            </Collapse>
          </div>

          <div className="shops__items">
            <div className="shops__items--searchbar">
              <SearchBar products={items} />
            </div>

            <div className="shops__items--lists">
              {items.map((p) => (
                <div key={p._id} className="shops__item">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ErrorScreen errMsg={error} />
      )}
    </>
  );
};

export default memo(Shops);
