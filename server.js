const express =require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection.js')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
});