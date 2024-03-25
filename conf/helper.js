const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const local = 'mongodb://localhost:27017/dbOfVuongw';

async function connect() {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database successfully!');
    } catch (error) {
        console.log('Connect to database fail!', error);
    }
}


module.exports = { connect };
