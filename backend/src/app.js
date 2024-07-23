import express ,{urlencoded} from 'express'
import userRoute from '../src/routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))



app.use(cookieParser())
app.use(express.json({limit:"250kb"}))
app.use(express.urlencoded({extended:true,limit:"250kb"}))
app.use(express.static("public"))


app.use("/api/v1/user",userRoute)
export {app}