import { Router } from 'express'
import * as cosasApi from './api_Productos.js'

export const routerCosas = Router()

routerCosas.get('/', (req, res) => {
    const cosas = cosasApi.getPoductos()
    res.json(cosas)
})

routerCosas.get('/:id', ({ params: {id } }, res) => {
    const cosas = cosasApi.getPoductosId(id)
    res.json(cosas)
})

routerCosas.post('/', async (req, res) => {
    const cosaCreada = await cosasApi.postProductos(req.body)
    res.json(cosaCreada)
})

routerCosas.put('/:id', ({ body, params: { id } }, res) => {
    const indiceBuscado = cosasApi.putProductos(id);
    console.log(indiceBuscado)
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        cosaCreada[indiceBuscado] = body;
        res.json(body);
    }
})