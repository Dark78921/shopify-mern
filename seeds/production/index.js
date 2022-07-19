import mongoose from 'mongoose';
import Product from '../../model/Product.js';
import Review from '../../model/Review.js';
import dotenv from 'dotenv';
import sampleProducts from './productsData.js';
dotenv.config();

mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Product.deleteMany({});
  await Review.deleteMany({});

  await Product.insertMany(sampleProducts);
};

seedDB().then(() => {
  console.log('Data Imported!');
  mongoose.connection.close();
});
