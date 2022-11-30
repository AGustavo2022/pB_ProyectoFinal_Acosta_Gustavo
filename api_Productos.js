import crypto from 'crypto'
import ContenedorProductos from './contenedor.js';

const productos = new ContenedorProductos()

export function getPoductos() {
    return productos.getAll()
}

export function getPoductosId(id) {
    return productos.getById(id)
}

export function postProductos(datos) {
    datos.id = crypto.randomUUID()
    productos.save(datos)
    return datos
}

export function putProductos(id) {
    return productos.putId(id)
}

export function deleteProductos(id) {
    return productos.deleteById(id)
}

