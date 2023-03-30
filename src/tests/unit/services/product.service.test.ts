import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import ProductModel from '../../../models/products.model';
import ProductService from '../../../services/products.service';
import { productMock, productMockWithId } from '../../mocks/productMock';


describe('Product Service', () => {
  const productModel = new ProductModel();
  const productService = new ProductService(productModel);
  const productArray = [productMockWithId]

  before(() => {
    sinon.stub(productModel, 'create').resolves(productMockWithId);
    sinon.stub(productModel, 'delete')
    .onCall(0).resolves(productMockWithId)
    .onCall(1).resolves(null);
  })

  after(() => {
    sinon.restore()
  })

  describe('Create Product', () => {
    it('Success', async () => {
      const productCreated = await productService.create(productMock);

      expect(productCreated).to.be.deep.equal(productMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await productService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Find All Products', () => {
    it('Success', async () => {
      sinon.stub(productModel, 'read').resolves(productArray);

      const products = await productService.read();
      expect(products).to.be.deep.equal(productArray);

      sinon.restore();
    });
  });

  describe('Find One Product', () => {
    it('Success', async () => {
      sinon.stub(productModel, 'readOne').resolves(productMockWithId);

      const productCreated = await productService.readOne(productMockWithId._id);

      expect(productCreated).to.be.deep.equal(productMockWithId);

      sinon.restore();
    });

    it('Failure', async () => {
      let error;
      sinon.stub(productModel, 'readOne').resolves(null);

      try {
        await productService.readOne(productMockWithId._id);
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);

      sinon.restore();
    });  
  });

  describe('Update Product', () => {
    it('Success', async () => {
      sinon.stub(productModel, 'update').resolves(productMockWithId);

      const updated = await productService.update('any-id', productMock);

      expect(updated).to.be.deep.eq(productMockWithId);

      sinon.restore();
    })
    
    it('Failure - Zod', async () => {
      let error;

      try {
        await productService.update('any-id', { INVALID: "OBJECT" })
      } catch(err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError)
    })

    it('Failure - Product not Found', async () => {
      sinon.stub(productModel, 'update').resolves(null);
      let error: any;

      try {
        await productService.update('any-id', productMock)
      } catch(err) {
        error = err;
      }

      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
    })
  });
  
  describe('Delete Product', () => {
    it('Success', async () => {
      sinon.stub(productModel, 'delete').resolves(productMockWithId);

      const product = await productService.delete(productMockWithId._id);
      expect(product).to.be.deep.equal(productMockWithId);

      sinon.restore();

    });
   
  });

});
