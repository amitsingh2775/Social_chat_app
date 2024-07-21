import dotenv from 'dotenv';
import { DB } from './db/index.js';
import {app} from './app.js'
const port=process.env.PORT ||8000

dotenv.config({
    path:'./.env'
});




DB().then(()=>{
    app.listen(port,()=>{
        console.log(`server start at ${port}`);
    })
 })
 .catch((error)=>{
    console.log(error);
 });

