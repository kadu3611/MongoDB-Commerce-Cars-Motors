import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  // atributos...
  // métodos...
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  //   public async read(name:string):Promise<T[]> {
  //     return [this._model.create(name)];
  //   }

  //   public async readOne(obj:T):Promise<T> {
  //     return this._model.create({ ...obj });
  //   }

//   public async create(obj:T):Promise<T> {
//     return this._model.create({ ...obj });
//   }
}