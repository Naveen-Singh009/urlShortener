import express from 'express'
import router from './routes/url.js';
import connectToDB from './connect.js';
import URL from './models/url.js';
import path from 'path'
import staticRoute from './routes/staticRouter.js' 
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser';
// import { checkAuth, restrictToLoddedinUserOnly } from './middlewares/auth.js';
import { checkForAuthentication , restrictTo } from './middlewares/auth.js';


const app = express();
const PORT = 8001;

connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("mongo db connected");
})

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)




// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls
//     }) 
// })



app.use('/url',restrictTo(["NORMAL"]), router)
app.use('/user', userRoute)
app.use('/', staticRoute)

app.get('/url/:shortId', async (req, res)=> {
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({
        shortId
    }, {$push : {
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})



app.listen(PORT, ()=>{
    console.log("app is listingin at port : ", PORT);
})