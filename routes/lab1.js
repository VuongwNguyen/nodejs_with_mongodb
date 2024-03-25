const express = require('express');
const router = express.Router();
// login by get method


// tinh dien tich hinh thang
router.post("/tinhDienTichHinhThang", function (req, res) {
    var { a, b, h } = req.params;
    res.json({ 'message': "Diện tích hình thang là: " + (a + b) * h / 2, status: true });
});

// const userData = [
//     { username: 'Vuongw', password: '123' },
//     { username: 'Huong', password: '123' }
// ];
// viết api để lấy thông tin product từ database và trả về cho client
router.get("/products", async function (req, res) {
    try {
        const products = await Product.find({});
        res.json({ products: products, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});
// viết api để lấy thông tin user từ database nhận vào username và password và trả về cho client
router.post("/login", async function (req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username, password: password });
        user ? res.json({ user: user, status: true })
            : res.json({ message: "User not found", status: false });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});
// viết api lấy lịch sử mua hàng của user
router.post('/history', async function (req, res) {
    try {
        const { user_id } = req.body;
        const orders = await Order.find({ user_id: user_id });
        res.json({ orders: orders, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});
//viết api thêm mới sản phẩm mới và 
// đảm các trường không trùng với các sản phẩm khác có trong database
router.post('/addProduct', async function (req, res) {
    try {
        const { name, description, price, quantity } = req.body;
        await Product.findOne({ name: name, description: description, price: price, quantity: quantity }) // kiểm tra xem sản phẩm đã tồn tại chưa
            ? res.json({ message: "Product already exists", status: false })// nếu sản phẩm đã tồn tại thì trả về thông báo
            : await Product.create({ name, description, price, quantity });
        res.json({ message: "Product added", status: true }); // nếu sản phẩm chưa tồn tại thì thêm mới sản phẩm và trả về thông báo
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});


//viết api thêm mới order
router.post('/addOrder', async function (req, res) {
    try {
        const { user_id, products, total_price, status } = req.body;
        const order = new Order({ user_id, products, total_price, status });
        await order.save();
        res.json({ order: order, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});
// viết api tìm kiếm sản phẩm theo kí tự nhập vào

// viết api đăng ký user hãy kiểm tra user đó đã có chưa?
router.post('/register', async function (req, res) {
    try {
        const { username, password, email, phone } = req.body;
        await User.findOne({ username: username, email: email, phone: phone })
            ? res.json({ message: "User already exists", status: false })
            : await User.create({ username, password, email, phone });
        res.json({ message: "User added", status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});
// viết api lấy ra tất cả category
router.get('/categories', async function (req, res) {
    try {
        const categories = await Category.find({});
        res.json({ categories: categories, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});

module.exports = router;