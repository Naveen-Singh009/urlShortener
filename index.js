import express from 'express'
import router from './routes/url.js';
import connectToDB from './connect.js';
import URL from './models/url.js';

const app = express();
const PORT = 8001;

connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("mongo db connected");
})

app.use(express.json())

app.use('/url', router)

app.get('/:shortId', async (req, res)=> {
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