const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carts', cartSchema);  // Export model để sử dụng ở các file khác