import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
// import { CarZodSchema } from '../interfaces/ICar';
// import { partialUtil } from 'zod/lib/helpers/partialUtil';

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
    
    return results;
  }

  public async update(_id: string, object: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    // if (!isValidObjectId(object)) throw new Error(ErrorTypes.InvalidMongoId);

    // const parser = CarZodSchema.safeParse(
    //   { ...object },
    // );
    // if (!parser.success) {
    //   throw parser.error;
    // }
    return this._model.findByIdAndUpdate(_id, { ...object }, { new: true });

    // const resultsFind = await this._model.findOne(
    //   { _id },
    // );
    // return resultsFind;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findByIdAndDelete({ _id });
  }
}