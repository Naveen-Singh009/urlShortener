import express from 'express'
import URL from '../models/url.js'
import { restrictTo } from '../middlewares/auth.js'


const router = express.Router()

router.get('/',restrictTo, async (req, res)=>{
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy : req.user._id})
    return res.render("home", {
        urls: allUrls
    })
})
router.get('/signup', async (req, res )=>{
    return res.render('signup')
})

router.get('/login', async (req, res )=>{
    return res.render('login')
})

export default router;