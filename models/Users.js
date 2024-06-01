const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    avatar: { type: String, default: null },
    status: { type: String, default: 'active', enum: ['active', 'inactive', 'deleted'] },
    address: { type: String },
    cart: {
        type: [{
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
            quantity: { type: Number }
        }], default: []
    },
    deleted_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Users', userSchema);
