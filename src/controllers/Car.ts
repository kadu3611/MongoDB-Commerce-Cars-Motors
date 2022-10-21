import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
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
}