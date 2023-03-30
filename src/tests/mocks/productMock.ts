import { IProduct } from '../../interfaces/IProduct';

const productMock:IProduct = {
  productName: 'Martelo de Vidro',
  price: 50.12,
  category: 'ferramentas',
  description: 'um verdadeiro martelo para as horas de necessidade',
}

const productMockWithId:IProduct & { _id:string } = {
  _id: '6424c56240ac7b7e48061e84',
  productName: 'Martelo de Vidro',
  price: 50.12,
  category: 'ferramentas',
  description: 'um verdadeiro martelo para as horas de necessidade',
}

export { productMock, productMockWithId };
