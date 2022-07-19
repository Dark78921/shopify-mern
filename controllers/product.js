import Product from '../model/Product.js';
import Review from '../model/Review.js';
import { ExpressError } from '../utils/ExpressError.js';

export const getProducts = async (_, res) => {
  const products = await Product.find({});
  if (!products) throw new ExpressError('Server Error!');
  res.json({
    success: true,
    length: products.length,
    products,
  });
};

export const createProduct = async (req, res) => {
  const product = await new Product(req.body).save();
  if (!product) throw new ExpressError('Server Error!');
  res.json({
    success: true,
    length: product.length,
    product,
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.pID }).populate(
    'reviews'
  );
  if (!product) throw new ExpressError('Product Not Found', 400);

  res.json({
    success: true,
    length: product.length,
    product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.pID },
    { ...req.body }
  );
  res.json({
    success: true,
    length: product.length,
    product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.pID });

  if (!product) throw new ExpressError('Product Not Found', 400);

  if (product.reviews) {
    for (let r of product.reviews) {
      await Review.findOneAndRemove({ _id: r._id });
    }
  }

  await product.remove();
  res.json({
    success: true,
    length: product.length,
    product,
  });
};
