const mongoose = require('mongoose');
const urlDB = process.env.MONGODB_CNN

const dbConnection = async () => {
    try{
        await mongoose.connect( urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log('Base de datos conectada')

    }catch (e){
        console.log(e)
        throw new Error('Error al conectar la base de datos');
    }


}


module.exports = {
    dbConnection
}