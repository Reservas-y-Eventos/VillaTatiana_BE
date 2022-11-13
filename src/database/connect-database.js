/*
'mongodb+srv://Goster210:JuanJoseRincon99.123@cluster0.e4qmu1m.mongodb.net/?retryWrites=true&w=majority'
'mongodb+srv://Jony:jony3lopez13@jony.0urqa.mongodb.net/AppReservas?retryWrites=true&w=majority'
*/
const mongoose = require('mongoose');
/*
datos locales

mongoose.connect('mongodb://localhost/villaTatiana', { useNewUrlParser: true })
    .then(() => console.log('Conexion correcta BD'))
    .catch((err) => console.log(`ERROR to connect : ${err.message}`));

    module.exports = mongoose;
*/
/*
datos host*/
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Conexion correcta BD'))
    .catch((err) => console.log(`ERROR to connect : ${err.message}`));

    module.exports = mongoose;



