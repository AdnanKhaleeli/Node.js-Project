const http = require('http');
const fs = require('fs');
const _ = require('lodash')


/* 
This takes a call back function that runs everytime a request comes into our sever.
So for instance we send back the homepage. 

We get passed two parameters, req obj--> the URL being requested, Request Type, and more
Response Object, is what we use to give a Response to the user

LocalHost is 127.0.0.1, which points back to your own computer
Port 3000, is like what door we are using. What door is the data comming into.
Each port has multipe protocals that can exists at the same time HTTP, UDP, TCP, etc. However, there can only 
be one application per port.

However, if we have different IP adresses, for instance Computer IP: 129729.292 connects to google and computer IP
12682.291. connects as well it's fine. 


So package.json when we copy our files to a new system, when we do npm install, it install the package depencies
However, if we have package-lock.json it says ah shit, we need a speicifc version and so installs that.  When we do
npm update, it updates the package-lock.json. Bassically package.json is the packages we need, and specifices basic updates if possible

*/




const server = http.createServer((req, res) => {
   console.log(req.url, req.method);

   const num = _.random(0,20); 
   console.log(num);

   const greet = _.once(() => {
      console.log('Hello');
   })


      



   // set header content type
   res.setHeader('Content-Type', 'text/html');

   let path = './views/';
   
   // Remember req.url returns / and after.
   switch(req.url) {
      case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
      case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
      case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end(); //Says were good, just redirect it.
            break;
      default:
            path += '404.html';
            res.statusCode = 404;
            
            break;
   }
   
   fs.readFile(path, (err, data) => {
      if (err) {
            console.log(err);
            res.end();
      } else {
       
        res.end(data);   // If using once, we can just pass it to the end method.
      }

   });

});



server.listen(3000, 'localhost', () => {
      console.log("Listenting for request on Port  3000")
});

