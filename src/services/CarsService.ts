import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';

export default class CarsService implements IService<ICar> {
  private _cars:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error; 
    }
    return this._cars.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._cars.read();
    return cars;
  }

  public async readOne(_id:string):Promise<ICar | null> {
    const car = await this._cars.readOne(_id);    
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, object: ICar):Promise<ICar | null> {
    const car = await this._cars.update(_id, object);
    const parser = CarZodSchema.safeParse(
      { ...object },
    );
    if (!parser.success) {
      throw parser.error;
    }
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async delete(_id:string):Promise<ICar | null> {
    const results = await this._cars.delete(_id);    
    if (!results) throw new Error(ErrorTypes.EntityNotFound);

    return null;
  }
}