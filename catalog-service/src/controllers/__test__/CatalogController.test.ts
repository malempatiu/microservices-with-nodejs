import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import {CatalogController} from '../CatalogController';

const getMockProductRequestPayload = (rest?: Record<string, any>) => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  stock: faker.number.int({min: 10, max: 100}),
  price: Number(faker.commerce.price()),
  ...rest
})

const app = express();
app.use(express.json());

describe('CatalogController', () => {
  const mockRequest = getMockProductRequestPayload();

  app.use('/api', new CatalogController({
  createProduct: jest.fn().mockReturnValueOnce(mockRequest),
  getProduct: jest.fn().mockImplementationOnce((id: number) => ({id, ...mockRequest})),
  getProducts: jest.fn().mockResolvedValueOnce(getMockProductRequestPayload({id: 1})),
  updateProduct: jest.fn().mockImplementationOnce((id: number, payload: any) => ({id, ...payload,...mockRequest})),
  deleteProduct: jest.fn().mockResolvedValueOnce(true),
}).router);

  describe('POST /products', () => {
    test('should create product successfully', async () => {
      const response = await request(app)
        .post('/api/products')
        .send(mockRequest)
        .set('Accept', 'application/json')
      expect(response.status).toBe(201)
      expect(response.body.name).toEqual(mockRequest.name);
    })
  })
})