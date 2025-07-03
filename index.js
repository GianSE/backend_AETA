//config inicial
require('dotenv').config()
const express = require('express') //importa o express
const mongoose = require('mongoose') // importa mongoose
const app = express() //inicializa a aplicação

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json()) //permite ler json

// rotas da API
const usuarioRoutes = require('./routes/usuarioRoutes')
const petRoutes = require('./routes/petRoutes')

app.use('/usuario', usuarioRoutes)
app.use('/pet', petRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar req

    res.json({ message: 'Oi Express!' })

})

/*
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbCluster = process.env.DB_CLUSTER
const dbName = process.env.DB_NAME
*/

const MongoURL = process.env.MONGO_URL

//entregar uma porta
//Conectar usando um arquivo .env
mongoose
    .connect(
        //`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`
        MongoURL
    )
    .then(() =>{
        console.log("Conectamos ao MongoDB!")
        app.listen(3000)
    })

    .catch((err) => console.log(err))
