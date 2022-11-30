import express from 'express'
import { routerCosas } from './router_Controlles.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerCosas)

//Servidor
const puerto = process.env.PORT ?? 8080

app.listen(puerto, () => {
    console.log(`escuchando puerto ${puerto} `)
})