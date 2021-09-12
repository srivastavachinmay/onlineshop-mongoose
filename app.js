const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./src/controllers/error');
const User = require('./src/models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('613b021e4cf57c8efa1b27ec')
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://Chinmay:cheenu@cluster0.v71un.mongodb.net/shop?retryWrites=true&w=majority').then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({name: "Chinmay", email: "test@test.com", cart: {items: []}})
            user.save()
        }
    })
    app.listen(3000)
    console.log(result)
}).catch(err => console.log(err))