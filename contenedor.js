import fs from 'fs'

export default class ContenedorProductos {
    #elemento
    #ruta
    constructor(){
        this.#elemento = []
        this.#ruta = './productos.txt'
    }

    async save(elemento){
        this.#elemento.push(elemento)
        await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#elemento))
    }

    async getById(number){
        const leerArchivo = await fs.promises.readFile(this.#ruta, 'utf-8')
        const arr = JSON.parse(leerArchivo)
        const arrId =  arr.find(el => number === el.id)
        return (arrId !== undefined)?arrId:null
    }

    async getAll(){
        this.#elemento = JSON.parse(await fs.promises.readFile(this.#ruta, 'utf-8'))
        return this.#elemento
    }

    async deleteById(number){
        const leerArchivo = await fs.promises.readFile(this.#ruta, 'utf-8')
        const arr = JSON.parse(leerArchivo)
        const posicion =  arr.findIndex(el => el.id === number)
        arr.splice(posicion,1)
        await fs.promises.writeFile(this.#ruta, JSON.stringify(arr))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.#ruta, '[]')
    }
}
