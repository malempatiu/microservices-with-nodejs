import { ICatalogRepository } from "@/interface/CatalogRepositoryInterface";
import { CatalogService } from "../CatalogService"
import { MockCatalogRepository } from "@/repository/MockCatalogRepository";
import {faker} from '@faker-js/faker';

const getMockProductRequestPayload = (rest?: Record<string, any>) => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  stock: faker.number.int({min: 10, max: 100}),
  price: Number(faker.commerce.price()),
  ...rest
})

describe('CatalogService', () => {
  let mockRepo: ICatalogRepository;
  let catalogService: CatalogService;

  beforeEach(() => {
    mockRepo = new MockCatalogRepository()
    catalogService = new CatalogService(mockRepo);
  })

  afterEach(() => {
    mockRepo = {} as ICatalogRepository;
  })

  describe('createProduct', () => {
    test('should create product', async () => {
      const mockPayload = getMockProductRequestPayload();
      const result = await catalogService.createProduct(mockPayload);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: mockPayload.name,
        description: mockPayload.description,
        price: mockPayload.price,
        stock: mockPayload.stock,
      });
    })

    test('should throw an error with unable to create product', async () => {
      jest.spyOn(mockRepo, 'create').mockResolvedValueOnce({} as any);
      const mockPayload = getMockProductRequestPayload();
      await expect(catalogService.createProduct(mockPayload)).rejects.toThrow('Unable to create product!');
    })

     test('should throw an error with product already exists', async () => {
      jest.spyOn(mockRepo, 'create').mockRejectedValueOnce(new Error('Product already exist'));
      const mockPayload = getMockProductRequestPayload();
      await expect(catalogService.createProduct(mockPayload)).rejects.toThrow('Product already exist');
    })
  })

  describe('updateProduct', () => {
    test('should update product', async () => {
      const mockProductId = faker.number.int({min: 1, max: 10});
      const mockPayload = getMockProductRequestPayload({id: mockProductId});
      const result = await catalogService.updateProduct(mockProductId, mockPayload);
      expect(result).toMatchObject(mockPayload);
    })

    test('should throw error for no product', async () => {
      jest.spyOn(mockRepo, 'update').mockRejectedValueOnce(new Error('Product does not exist!'))
      const mockProductId = faker.number.int({min: 1, max: 10});
      const mockPayload = getMockProductRequestPayload({id: mockProductId});
      await expect(catalogService.updateProduct(mockProductId, mockPayload)).rejects.toThrow('Product does not exist!');
    })
  })

  describe('deleteProduct', () => {
    test('should delete a product', async () => {
      const result = await catalogService.deleteProduct(1);
      expect(result).toBeTruthy();
    })

     test('should throw error for no product', async () => {
      jest.spyOn(mockRepo, 'findById').mockRejectedValueOnce(new Error('Product not found!'));
      await expect(catalogService.deleteProduct(1)).rejects.toThrow('Product not found!');
    })
  })

  describe('getProduct', () => {
    test('should throw error for no product', async () => {
      jest.spyOn(mockRepo, 'findById').mockRejectedValueOnce(new Error('Product not found!'));
      await (expect(catalogService.getProduct(1))).rejects.toThrow('Product not found!');
    }) 

    test('should return a product', async () => {
      const result = await catalogService.getProduct(1);
      expect(result.id).toEqual(1);
    }) 
  })
 })