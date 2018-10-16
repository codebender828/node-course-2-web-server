const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//  Express server middleware
const app = express();

// Middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


// -----------------
/* Uncommenting the function below will launch the maintenance page for all routes, blocking other routes. */

// app.use((req, res, next) => {
//     console.log('Maintenance Page uncommented.) 
//     res.render('maintenance.hbs');
// });
// -----------------


app.use(express.static(__dirname + '/public'));

// Handlebars
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


//  Routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'East Star Consulting',
        welcomeMessage: 'Welcome to East Star Consulting!',
        description: 'Here at East Star Consulting, we believe in duly diligent and excellent solutions for all our partners in Asia and Africa.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(8080, () => {
    console.log('Server started at port 8080');
    
});