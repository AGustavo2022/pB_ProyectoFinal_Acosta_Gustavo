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
    const cosas = cosasApi.controladorGetProducto()
    res.status(201)
    res.json(cosas)
})

routerCosas.get('/:id', ({ params: {id } }, res) => {
    const cosas = cosasApi.controladorGetProductosSegunId(id)
    if (!cosas) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        res.json(cosas);
    }
})

routerCosas.post('/', soloParaAdmins, (req, res) => {
    const cosaCreada = cosasApi.controladorPostProductos(req.body)
    res.status(201)
    res.json(cosaCreada)
})

routerCosas.put('/:id', soloParaAdmins,({ body, params: { id } }, res) => {
    const indiceBuscado = cosasApi.controladorPutProductosSegunId(id);
    const cosaCreada = []
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        cosaCreada[indiceBuscado] = body;
        res.json(body);
    }
})

routerCosas.delete('/:id', soloParaAdmins, ({ params: { id } }, res) => {
    const indiceBuscado = cosasApi.controladorDeleteProductosSegunId(id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ error: `Producto no encontrado (${id})`});
    } else {
        res.sendStatus(204)
        res.json(borrados);
    }
})