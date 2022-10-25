import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotoController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const results = await this._service.create(req.body);
    console.log(req.body, 'req.body');
    
    return res.status(201).json(results);
  }

  public async read(
    req: Request,

    res: Response<IMotorcycle[]>,
  ) {
    const results = await this._service.read();
    
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,

    res: Response<IMotorcycle | null>,
  ) { 
    const { id } = req.params;   
    const results = await this._service.readOne(id);   
    return res.status(200).json(results);
  }

  public async update(
    req: Request,

    res: Response<IMotorcycle | null>,
  ) { 
    const { id } = req.params;
    const object = req.body;
    
    const results = await this._service.update(id, object);
    
    return res.status(200).json(results);
  }

  public async delete(
    req: Request,

    res: Response<IMotorcycle | null>,
  ) { 
    const { id } = req.params;
    
    await this._service.delete(id);    
    return res.status(204).json();
  }
}