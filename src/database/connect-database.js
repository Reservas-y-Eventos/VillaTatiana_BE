
/*const mongoose = require('mongoose');

const basedeDatos = async ()=>{
 await mongoose.connect('mongodb://localhost/villaTatiana')
 .then(() => console.log('la base de datos esta conectada'))
 .catch((error) => console.error(err));

}
module.exports = basedeDatos;

'mongodb+srv://Goster210:JuanJoseRincon99.123@cluster0.e4qmu1m.mongodb.net/?retryWrites=true&w=majority'
*/

const mongoose = require('mongoose');

//'mongodb://localhost/villaTatiana'
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Conexion correcta BD'))
    .catch((err) => console.log(`ERROR to connect : ${err.message}`));

    module.exports = mongoose;



