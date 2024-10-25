const express = require('express');

const Blog = require('../models/blog');
const router = express.Router();


//These are the blog routes
/**
 * Btw to save a Document, we do blog = new Blog(<insert object with document attributes>). Then blog.save
 */
router.get('/', async (req, res) => {

    const doc = await Blog.find().sort( {createdAt : -1});
    res.render('index', {title: 'All blogs', blogs: doc})

});

//This keeps track fo all post requests send to the /blogs URL.
router.post('/', async (req, res) => {

    try {
    const blog = new Blog(req.body);
    const result = await blog.save(); 
    res.redirect('/blogs');
    }catch(err) {
        console.log(err);
    }
}); 



router.get('/create', (req, res) => {
    res.render('create',  {title: 'Create a new blog'});
 });

//:id specifies a route parameter.
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    const doc = await Blog.findById(id);
    res.render('details', {blog: doc, title: 'Blog Details'})
})


router.delete('/:id', async (req, res) => {
    const id=req.params.id;
    const result = await Blog.findByIdAndDelete(id);
    //The fetch API is a ajax request, since we do in via JS not a webform
    //We cannot use a redirect as a response. Not allowed. We send a JSON which has a redirect property
    
    res.json( {redirect: '/blogs'});
} )

module.exports = router;