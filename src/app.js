const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./database/connect-database');

//middleware
app.use(express.json());
app.use(cors());
//settings
app.set('port', process.env.PORT || 5000);
//routas del ususario
app.use('/api/user',require('./routes/auth'));
//rutas del formulario
app.use('/api/form',require('./routes/forms'));
app.use('/api/admin',require('./routes/admin'));
app.use('/api/item',require('./routes/item'));
//app.use('/api/form',require('./routes/forms'));

app.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'));
});  