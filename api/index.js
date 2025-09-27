import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import uploadRoutes from './routes/upload.route.js';
import path from 'path';
import cors from 'cors';

dotenv.config();
//mongodb://localhost:27017/
mongoose.connect("mongodb://localhost:27017/mern-estate").then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// const __dirname = path.resolve();


const app = express();

app.use(express.json());

app.use(cookieParser());


app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use('/api', uploadRoutes);

// app.use(express.static(path.join(__dirname, '/mern-project/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/mern-project/dist/index.html'));
// })

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})

