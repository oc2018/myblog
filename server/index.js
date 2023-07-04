import express from 'express';
import dotenv from 'dotenv';
import  cors  from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import postRoutes from  './routes/postRoutes.js';

const app = express();
dotenv.config();
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cors({ credentials: true, origin: 'https://myblog-iz43.vercel.app/' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static( 'uploads'));

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);

app.get('/', (req, res) => {
    res.send('the blog is live');
})

const port = process.env.PORT || 3000;

;
mongoose.connect( process.env.DATABASE_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>app.listen(port, console.log(`Server listening on port http://localhost:${port}/test`)))
.catch((error) => console.log(error.message));

