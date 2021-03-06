const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            uploads:    '/api/uploads',
            usarios:    '/api/usuarios',
        }
        // this.usuariosRouterPath = '/api/usuarios';
        // this.authPath = '/api/auth';

        // Conexion a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares(){
        //Cors
        this.app.use( cors() )

        //Parseo y lectura de body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.categorias , require('../routes/categorias'));
        this.app.use(this.path.productos , require('../routes/productos'));
        this.app.use(this.path.uploads, require('../routes/uploads'));
        this.app.use(this.path.usarios , require('../routes/usuarios'));
    }


    listen() {
        this.app.listen(this.port , () => {
            console.log('Server running on the port ', this.port );
        })
    }
}


module.exports=Server;