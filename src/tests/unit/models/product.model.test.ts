import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../models/products.model';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { productMock, productMockWithId } from '../../mocks/productMock';
import { IProduct } from '../../../interfaces/IProduct';

describe('Product Model', () => {
  const productModel = new ProductModel();
  const productArray = [productMockWithId]

  before(() => {
    sinon.stub(Model, 'create').resolves(productMockWithId);
    sinon.stub(Model, 'find').resolves(productArray);
    sinon.stub(Model, 'findOne').resolves(productMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(productMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(productMockWithId);

  });

  after(() => {
    sinon.restore();
  });

  describe('creating a product', () => {
    it('successfully created', async () => {
      const newProduct = await productModel.create(productMock);
      expect(newProduct).to.be.deep.equal(productMockWithId);
    });
  });

  describe('searching all products', () => {
    it('successfully found array of products', async () => {
      const productsFound = await productModel.read();

      expect(productsFound).to.be.an('array');
    });

    it('The array contains a product', async () => {
      const productsFound = await productModel.read();

      productsFound?.forEach((item: IProduct, index: number) => {
        expect(item).to.be.deep.equal(productArray[index]);
      });
    });
  });

  describe('searching a product', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const productFound = await productModel.readOne('any-id');
      expect(productFound).to.be.deep.equal(productMockWithId);
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await productModel.readOne('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

  describe('updating a product', () => {
    it('successfully updated', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const updated = await productModel.update('any-id', productMock)
      expect(updated).to.be.deep.equal(productMockWithId)
      stub.restore();
    })

    it('throws InvalidMongoId with invalid id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await productModel.update('invalid-id', productMock)
      } catch (err){
        error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal('InvalidMongoId');
      stub.restore();
    });
  });

  describe('deleting product', () => {
    it('product deleted successfully', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const productDeleted = await productModel.delete('any-id');

      expect(productDeleted).to.be.deep.equal(productMockWithId)
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await productModel.delete('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

});  
