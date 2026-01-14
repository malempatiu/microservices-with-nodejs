import { ICartRepository } from "@/interface/ICartRepository";
import { ICartService } from "@/interface/ICartService";

class CartService implements ICartService {
  private readonly cartRepo: ICartRepository;

  constructor (cartRepo: ICartRepository) {
    this.cartRepo = cartRepo;
  }

  createCart = async (dto: any) => {
    const result = await this.cartRepo.create(dto);
    if (!result?.id) {
      throw new Error('Unable to create product!');
    }
    return result;
  }

  getCart = async (id: number) => {
    const result = await this.cartRepo.findById(id);
    if (!result) {
      throw new Error('Product not found!')
    }

    return result;
  }

  updateCart = async (id: number, dto: any) => {
    const result = await this.cartRepo.update(id, dto);
    // emit event to update record in Elastic search
    return result;
  }

  // Delete record from ES
  deleteCart = async (id: number) => {
    const product = await this.getCart(id);
    await this.cartRepo.delete(product.id!);
    return true;
  }
}

export {CartService};