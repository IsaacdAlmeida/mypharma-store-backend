import { z } from 'zod';

const ProductZodSchema = z.object({
  productName: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name be a string',
  })
    .min(3, { message: 'Product name be 3 or more characters long' }),

  price: z.custom<number>(
    (val) => typeof val === 'number' && Number(val.toFixed(2)) === val,
  ).refine(
    (val) => Number(val.toFixed(2)) > 0,
    {
      message: 'Price must be greater than 0',
    },
  ).default(0),

  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }).min(3, { message: 'Category must be 3 or more characters long' }),

  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }).min(15, { message: 'Description must be 15 or more characters long' }),
});

export type IProduct = z.infer<typeof ProductZodSchema>;

export { ProductZodSchema };
