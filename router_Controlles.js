import { Router } from 'express'
import * as cosasApi from './api_Productos.js'

export const routerCosas = Router()

let esAdmin = false

function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

routerCosas.post('/login', (req, res) => {
    esAdmin = true
    res.sendStatus(200)
})

routerCosas.post('/logout', (req, res) => {
    esAdmin = false
    res.sendStatus(200)
})

routerCosas.get('/', (req, res) => {
    const cosas = cosasApi.getPoductos()
    res.json(cosas)
})

routerCosas.get('/:id', ({ params: {id } }, res) => {
    const cosas = cosasApi.getPoductosId(id)
    res.json(cosas)
})

routerCosas.post('/', soloParaAdmins, async (req, res) => {
    const cosaCreada = await cosasApi.postProductos(req.body)
    res.json(cosaCreada)
})

routerCosas.put('/:id', soloParaAdmins,({ body, params: { id } }, res) => {
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

routerCosas.delete('/:id', soloParaAdmins, ({ params: { id } }, res) => {
    const indiceBuscado = cosasApi.deleteProductos(id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        const borrados = producto.splice(indiceBuscado, 1);
        res.sendStatus(204)
        res.json(borrados[0]);
    }
})