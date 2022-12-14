import fs from 'fs'
import crypto from 'crypto'

const rutaArchivo = './productos.txt'

function productos () {
    const data = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'))
    return data
}

const producto = productos()


export function controladorGetProducto() {
    const data = producto
    return data
}

export function controladorGetProductosSegunId(id) {
    const buscado = producto.find(c => c.id == id);
    console.log(buscado)
    return buscado
}

export function controladorPostProductos(datos) {
    const productoNuevo = datos;
    productoNuevo.id = crypto.randomUUID();
    producto.push(productoNuevo);
    return producto
}

export function controladorPutProductosSegunId(id) {
    const indiceBuscado = producto.findIndex(c => c.id === id );
    return indiceBuscado
}

export function controladorDeleteProductosSegunId(id) {
    const indiceBuscado = producto.findIndex(c => c.id === id);
    const borrados = producto.splice(indiceBuscado, 1);
    fs.promises.writeFile(rutaArchivo, JSON.stringify(borrados))
    return {indiceBuscado, borrados}
}
