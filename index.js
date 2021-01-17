const express = require('express');
//console.log(express);
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
//to use the schema 
const Contact = require('./models/contact');

const app = express();
//console.log(app);

//to tell express that ejs will be our view engine or template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// it read the form data and parses it into key and value pair
app.use(express.urlencoded());

//this is used to view the static file i.e assets folder
app.use(express.static('assets'));

var contactList = [
    {
        name: "Pragya",
        phone: "1234567890"
    },
    {
        name: "kajal",
        phone: "4532176589"
    },
    {
        name: "piu",
        phone: "95642465625"
    }
]

app.get('/', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('Error in fetching contacts fro the database');
            return;
        }
        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });
    });
});
app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "lets play with ejs"
    });
});

app.post('/create-contact', function (req, res) {
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating a contact');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});


//for deleting a contact
app.get('/delete-contact', function (req, res) {
    
    //get the id from query in the ul
    let id = req.query.id;

    //find the connect in the database using id and delete
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting an object frm database');
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
        return;
    }
    console.log('yup!my express server is running on port', port);
});