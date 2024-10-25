const express = require('express'); 
const morgan = require('morgan'); 

const mongoose = require('mongoose'); 

const blogRoutes = require('./routes/blogRoutes');

const app = express(); 

//Connect to MongoDB
const dbURI = 'mongodb+srv://Ninja:Test1234@cluster0.z9br0.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI).then( (result) => app.listen(3000, 'localhost')).catch( (err) => console.log(err));


//Register View Engine
app.set('view engine', 'ejs');
 // app.set('views', 'myviews'); views is the default folder



//Middleware & static files. Like CSS, images that we need to make public
//Otherwise Express by default blocks all acess to files that are not used in app.get()
//Now we just do /styles.css to acess it using href.
//We grant it acess, we can even do /styles.css to see it
app.use(express.static('public'));

//Attaches req.body the object that has the form data.
app.use(express.urlencoded( {extended:true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
   res.status(505).redirect('/blogs');
});


app.get('/about', (req, res) => {

    res.render('about',  {title: 'About'});
});


//blog routes
//This creates routes that alwayts start with /blogs. It automatically prepends '/blogs' to whatever route you have blogRoutes
//This also means it will quickly skip looking at all the routes in blogRoutes if the URL does not have \blogs.
// Also means easy to change URL's
app.use('/blogs', blogRoutes);


//404 error
//We create middleware and middleware functions(We learn later)

//The Use will fire for every single request, only if the request reaches this point.
//Only when we match the '/about, etc bruv.
//The position matters bruv, it's almost like a switch statement fam.
//We need the .status() to send the 404 error statuscode. 
// Status 404 returns the res object again, just with a 404 stauscode.
app.use((req, res) => {
    res.status(404).render('404',  {title: '404'})
});



