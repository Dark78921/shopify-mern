import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  stripeId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Payment', PaymentSchema);
