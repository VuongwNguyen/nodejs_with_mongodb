const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// const local = 'mongodb+srv://doadmin:H3fKp1D95rU2467k@db-mongodb-sgp1-99474-841772ec.mongo.ondigitalocean.com/admin?replicaSet=db-mongodb-sgp1-99474&tls=true&authSource=admin';
const local ='mongodb://localhost:27017/dbOfVuongw'
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
