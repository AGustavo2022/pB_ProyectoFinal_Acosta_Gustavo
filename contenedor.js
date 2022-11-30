
export default class ContenedorProductos {
    #elemento
    constructor(){
        this.#elemento = []
    }

    save(elem){
        this.#elemento.push(elem)
    }

    getById(number){
        const arrId = this.#elemento.find(el => number === el.id)
        return (arrId !== undefined)?arrId:null
    }

    getAll(){
        return this.#elemento
    }

    putId(number) {
        const indiceBuscado = this.#elemento.findIndex(c => c.id === number);
        return indiceBuscado
    }

    deleteById(number){
        const posicion =  this.#elemento.findIndex(el => el.id === number)
        this.#elemento.splice(posicion,1)
    }

}
