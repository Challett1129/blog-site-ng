//Import dependencies 
const express =require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection.js')
const routes = require('./controllers')

//init express in our app
const app = express();
//allows port to connect to native hosting application port or localhost port
const PORT = process.env.PORT || 3001;

//middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes)


//sequelizeeeeeeeeeeeeeeeeeeeee
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
});