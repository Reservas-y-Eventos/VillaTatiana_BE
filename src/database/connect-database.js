const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connect DB Success'))
    .catch((err) => console.log(`ERROR to connect : ${err.message}`));

module.exports = mongoose;
/*
const mongoose = require('mongoose');

const basedeDatos = async ()=>{
 await mongoose.connect('mongodb://localhost/villaTatiana')
 .then(() => console.log('la base de datos esta conectada'))
 .catch((error) => console.error(err));

}
module.exports = basedeDatos*/