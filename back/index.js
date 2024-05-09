const express = require('express');
const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use(require('./routes/index'));


app.use((req, res, next) => {
    res.status(404).send('404: Page not found');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});