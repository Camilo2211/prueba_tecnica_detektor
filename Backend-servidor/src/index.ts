import express from 'express';
import indexRoutes from './routes/index';
import cors from 'cors'

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: 'http://localhost:4200'
  }));

app.use(indexRoutes);

app.listen(3000, ()=>{console.log('Server on port', 3000)})

