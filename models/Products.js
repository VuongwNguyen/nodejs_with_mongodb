const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: [String],
    price: { type: Number, default: 0, required: true},
    quantity: { type: Number, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    status: { type: String, default: 'active', enum: ['active', 'inactive', 'deleted'] },
    deleted_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', productSchema);