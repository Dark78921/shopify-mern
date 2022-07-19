import Review from '../model/Review.js';
import Product from '../model/Product.js';
import { ExpressError } from '../utils/ExpressError.js';

export const createReview = async (req, res) => {
  const review = new Review(req.body);
  if (!review) throw new ExpressError('Server Error!');
  const product = await Product.findOne({ _id: req.params.pID });
  if (!product) throw new ExpressError('Product Not Found!', 400);
  product.reviews.push(review._id);
  await product.save();
  await review.save();
  res.redirect(`/api/p/${product._id}`);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.rID });
  if (!review) throw new ExpressError('Review Not Found!', 400);
  const product = await Product.findOneAndUpdate(
    { _id: req.params.pID },
    { $pull: { reviews: review._id } }
  );
  await review.remove();
  res.redirect(`/api/p/${product._id}`);
};
