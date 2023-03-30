import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IProduct } from '../interfaces/IProduct';

class ProductController {
  constructor(private _service: IService<IProduct>) { }

  public async create(
    req: Request,
    res: Response<IProduct>,
  ) {
    const product = await this._service.create(req.body);
    return res.status(201).json(product);
  }

  public async read(
    req: Request,
    res: Response<IProduct[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(
    req: Request,
    res: Response<IProduct>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<IProduct>,
  ) {
    const updated = await this._service.update(req.params.id, req.body);

    return res.status(200).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<IProduct>,
  ) {
    await this._service.delete(req.params.id);
    return res.status(204).send();
  }
}

export default ProductController;
