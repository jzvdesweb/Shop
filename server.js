const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

// Handle Uncaught exceptions (Es para atrapar error en exepciones)
process.on(`uncaughtException`, err => {
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down server due to uncaught exceptions`);
    process.exit(1)
})


// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })



// Connecting to database
connectDatabase();



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections (Es para atrapar si hay un error con el servidor)
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down the server due to Unhandled Promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})