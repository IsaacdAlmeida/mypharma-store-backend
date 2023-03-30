import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { productMock, productMockWithId } from '../../mocks/productMock';
import ProductController from '../../../controllers/products.controller';
import ProductService from '../../../services/products.service';
import ProductModel from '../../../models/products.model';

describe('Product Controller', () => {
  const productModel = new ProductModel()
  const productService = new ProductService(productModel);
  const productController = new ProductController(productService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(productService, 'create').resolves(productMock);
    sinon.stub(productService, 'read').resolves([productMockWithId]);
    sinon.stub(productService, 'readOne').resolves(productMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Product', () => {
    it('Success', async () => {
      req.body = productMock;
      await productController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMock)).to.be.true;
    });
  });

  describe('Read Product', () => {
    it('Success', async () => {
      await productController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([productMockWithId])).to.be.true;
    });
  });

  describe('ReadOne Product', () => {
    it('Success', async () => {
      req.params = { id: productMockWithId._id };
      await productController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMock)).to.be.true;
    });
  });

  describe('Update Product', () => {
    it('Success', async () => {
      sinon.stub(productService, 'update').resolves(productMockWithId)

      await productController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMockWithId)).to.be.true;
    })
  })
});