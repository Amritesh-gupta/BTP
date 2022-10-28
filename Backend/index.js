import express from 'express';
import './db/mongoose.js';
import userRouter from './routes/userRoute.js';
import fileRouter from './routes/fileRoute.js';
import emailRouter from './routes/emailRoute.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(fileRouter);
app.use(emailRouter);


app.get('/test',(req,res)=>{
    res.send('hi all')
})

app.listen(port,()=>{
    console.log(`Listining to port ${port}`);
})
