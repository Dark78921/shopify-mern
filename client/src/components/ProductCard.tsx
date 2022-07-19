import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ReviewTypes } from '../utils/types';

// Statics
import './ProductCard.css';

interface Props {
  varified: boolean;
  images: string[];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: ReviewTypes[];
  // __v: string
}

const ProductCard: React.FC<Props> = ({
  images,
  name,
  price,
  varified,
  reviews,
  _id,
}) => {
  const history = useHistory();
  const handleClick = useCallback(() => history.push(`/s/${_id}`), [
    _id,
    history,
  ]);

  return (
    <div className="productCard" onClick={handleClick}>
      <img src={images[0]} alt={name} className="productCard__image" />
      <div className="productCard__footer">
        <p className="productCard__name">{name}</p>
        <p className="productCard__review">{reviews?.length} Reviews</p>
        <p className="productCard__price">${price}</p>
      </div>
    </div>
  );
};

export default memo(ProductCard);
