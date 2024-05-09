const logger = (req, res, next) => {
    res.status(404).send({ error: 'Not found' });
}

// app.use((req, res, next) => {
//     console.log(req.method);
//     console.log(req.path);
//     console.log(req.body);
//     console.log('---');
//     next();
// });

//Middleware que se ejecuta para todas las rutas
//No tiene path, por lo que se ejecuta para todas las rutas
// el .use() es un método que se utiliza para cargar middleware
// tanto para GET como para POST

module.exports = logger;