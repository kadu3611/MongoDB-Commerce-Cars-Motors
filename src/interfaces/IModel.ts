export default interface IModel<T> {

  create(objecto:T): Promise<T>,
  //  deve receber um objeto do tipo Te retornar uma Promise do tipo T.
  read(): Promise<T[]>,
  //  deve retornar uma Promise contendo um array de objetos do tipo T.
  readOne(name:string): Promise<T | null>,
  //  deve receber uma string e retornar uma Promise do tipo T ou nula.
  update(name: string, object: T):Promise<T | null>,
  //  deve receber uma string e um objeto do tipo T e retornar uma Promise do tipo T ou nula.
  delete(name: string): Promise<T | null>,
  //  deve receber uma string e retornar uma Promise do tipo T ou nula.

}

export {
  IModel,
};