import { ICatalogRepository } from "@/interface/ICatalogRepository";
import { ProductModel } from "@/models/ProductModel";
import {prisma} from "@/lib/prisma"; 

class CatalogRepository implements ICatalogRepository {  
  create = async (product: ProductModel): Promise<ProductModel> => {
    const data = await prisma.product.create({data: product});
    return data;
  }

  find = async (): Promise<ProductModel[]> => {
    const data = await prisma.product.findMany();
    return data;
  }

  findById = async (id: number): Promise<ProductModel | null> => {
    const data = await prisma.product.findFirst({where: {id}});
    return data;
  }

  update = async (id: number, product: ProductModel): Promise<ProductModel> => {
    const data = await prisma.product.update({where: {id}, data: product});
    return data;
  }

  delete = async (id: number): Promise<void> => {
    await prisma.product.delete({where: {id}});
  }
}

export {CatalogRepository};

