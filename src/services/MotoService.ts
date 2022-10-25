import { MotorcycleZod, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';

export default class MotoService implements IService<IMotorcycle> {
  // quando fazemos IService<IFrame> acima 
  // estamos implementando a interface com o tipo IFrame com o parâmetro genérico
  private _moto:IModel<IMotorcycle>;
  // o mesmo fazemos aqui com a interface do Model
  constructor(model:IModel<IMotorcycle>) {
    this._moto = model;
  }

  public async create(obj:unknown):Promise<IMotorcycle> {
    const parsed = MotorcycleZod.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error; 
    }
    return this._moto.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._moto.read();
    return cars;
  }

  public async readOne(_id:string):Promise<IMotorcycle | null> {
    const car = await this._moto.readOne(_id);    
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, object: IMotorcycle):Promise<IMotorcycle | null> {
    const car = await this._moto.update(_id, object);
    const parser = MotorcycleZod.safeParse(
      { ...object },
    );
    if (!parser.success) {
      throw parser.error;
    }
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async delete(_id:string):Promise<IMotorcycle | null> {
    const results = await this._moto.delete(_id);    
    if (!results) throw new Error(ErrorTypes.EntityNotFound);

    return null;
  }
}