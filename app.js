import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import userRoute from './routes/user';

const app = express();

//db connection
mongoose.connect(
  process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

// middleware
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// app.use(cookieParser);
// routes
app.use('/api', authRoute);
app.use('/api', userRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
