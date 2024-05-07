const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const local = 'mongodb+srv://doadmin:DJKmS9h1a35286c7@db-mongodb-sgp1-69243-6223c8f3.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-sgp1-69243';
// const local ='mongodb://localhost:27017/dbOfVuongw'
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
