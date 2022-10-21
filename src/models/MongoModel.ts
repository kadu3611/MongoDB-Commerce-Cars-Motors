import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

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

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const results = await this._model.findOne({ _id });
    console.log(results, 'results');
    
    return results;
  }

//   public async create(obj:T):Promise<T> {
//     return this._model.create({ ...obj });
//   }
}