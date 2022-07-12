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
//routes
app.use('/api/user',require('./routes/auth'));

app.use('/api/note',require('./routes/notes'));
app.use('/api/admin',require('./routes/admin'));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});  