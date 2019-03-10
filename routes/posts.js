const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));

router.get('/posts', (req, res) =>{
    Post.find({status:'1'})
        .exec()
        .then(posts =>
        {
        console.log(posts);
        res.render('posts',{
            posts
        })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error :error})
        });
});
router.post('/', (req, res) => {
    let errors=[];
    let success=[];
    let body=req.body.body;
    if(!body){
        errors.push({text:"Συμπληρώστε αυτο το πεδίο!"});
        res.render('index',{errors});
    }else {
        success.push({text:"Η ανακοίνωση σου υποβλήθηκε με επιτυχία και θα αναρτηθεί όταν εγκριθεί απο τον διαχειριστή!"});
        const newPost = new Post({
            _id: new mongoose.Types.ObjectId(),
            body
        });
        newPost.save().then(res.render('index',{success}));
    }
});
router.get('/about',(req,res)=>res.render('about'));
module.exports = router;
