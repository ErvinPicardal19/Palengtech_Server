require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents.js');
const errorHandler = require('./middleware/errorHandler.js');
const root = require('./routes/root.js');
const corsOptions = require('./config/corsOptions.js');

const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const credentails = require('./middleware/credentials.js');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn.js');

//Connect to MongoDB
connectDB();


const app = express();
const port = 5000 || process.env.PORT;

app.use(errorHandler);

//Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentails);

//Cross Origin Resource Sharing
app.use(cors());

//Parse Form Data
app.use(express.urlencoded({ extended: false }));
//Parse Json Data
app.use(express.json());
//Parse cookie
app.use(cookieParser());

app.use(express.static('./public'));

//Routers
app.use('/', root)
app.use('/register', require('./routes/register.js'));

app.use('/auth', require('./routes/auth.js'));
app.use('/refresh', require('./routes/refresh.js'));
app.use('/logout', require('./routes/logout.js'));

// app.use(verifyJWT);
app.use('/api/v1', require('./routes/api/data_api.js'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ success: false, err: 404, msg: 'Not Found!' });

    } else {
        res.type('txt').send('404: Not Found!')
    }
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Listening on PORT: ${port}...`));
})
