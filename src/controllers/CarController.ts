import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    // Usamos o IFrame como parâmetro genérico do Request
    // para declarar que vamos responder a requisição com um objeto do tipo IFrame
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, buyValue, doorsQty, seatsQty };
    const results = await this._service.create(car);
    
    return res.status(201).json(results);
  }

  public async read(
    req: Request,

    res: Response<ICar[]>,
  ) {
    const results = await this._service.read();
    
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,

    res: Response<ICar | null>,
  ) { 
    const { id } = req.params;   
    const results = await this._service.readOne(id);   
    return res.status(200).json(results);
  }

  public async update(
    req: Request,

    res: Response<ICar | null>,
  ) { 
    const { id } = req.params;
    const object = req.body;
    
    const results = await this._service.update(id, object);
    
    return res.status(200).json(results);
  }

  public async delete(
    req: Request,

    res: Response<ICar | null>,
  ) { 
    const { id } = req.params;
    
    await this._service.delete(id);    
    return res.status(204).json();
  }
}