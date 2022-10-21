import { Car, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarsService implements IService<ICar> {
  // quando fazemos IService<IFrame> acima 
  // estamos implementando a interface com o tipo IFrame com o parâmetro genérico
  private _cars:IModel<ICar>;
  // o mesmo fazemos aqui com a interface do Model
  constructor(model:IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    // recebemos uma variável qualquer, e garantimos que ela é um objeto com formato correto utilizando o zod
    const parsed = Car.safeParse(obj);
    // agora, caso os tipos estejam errados (success = false), nós lançaremos um erro
    if (!parsed.success) {
      throw parsed.error; // vamos falar sobre como esse erro tratá-lo logo logo
    }
    return this._cars.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._cars.read();
    return cars;
  }
}