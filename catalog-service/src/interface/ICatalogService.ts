export interface ICatalogService {
  createProduct(payload: any): Promise<any>;
  getProducts(limit: number, offset: number): Promise<any>;
  getProduct(id: number): Promise<any>;
  updateProduct(id: number, payload: any): Promise<any>;
  deleteProduct(id: number): Promise<boolean>;
}