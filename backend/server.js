const express = require('express');
const app = express();
const path  = require('path');
const mongoose = require('mongoose');
const UserRoutes = require('./UserRoutes');
const bodyParser = require('body-parser');
const productRoutes = require('./productRoutes');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/keys');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');






// Connection
// dotenv.config();
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('connected to db'))
.catch( error => {
    console.log( error.message);
});


//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(__dirname+ '/uploads'));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(__dirname+ '/uploads'));
app.use(cookieParser());
app.use('/api/users', UserRoutes);
app.use('/api/products', productRoutes);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));

    });
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening to port 5000'));