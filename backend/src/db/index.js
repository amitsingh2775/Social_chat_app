import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

export const DB=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`).then(()=>{
            console.log("datase is connected");
        })
    } catch (error) {
        console.log("database is not connected",error,message);
    }
}