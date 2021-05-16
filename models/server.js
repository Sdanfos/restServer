const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRouterPath = '/api/usuarios'

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
    }

    routes() {
        this.app.use(this.usuariosRouterPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Server running on the port ', this.port );
        })
    }
}


module.exports=Server;