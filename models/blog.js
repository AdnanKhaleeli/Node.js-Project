const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const blogSchema = new Schema( {
    title: {
        type: String,
        required: true
    }, 

    snippet: {
        type: String,
        required: true, 
    },

    body: {
        type: String,
        required: true
    }

}, {timestamps: true});


/*

Schema is what defines the Structure
The model is what surronds that and provides us with functionality
to communicate with the document type. So it bassically takes the Schema, the DB name'
and handles interface with it.


*/

// It looks for the collection that is the plural of the String we pass it. It looks for "Blogs"
//This returns a Constructor for a Blog document.
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;