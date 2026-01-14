import { config } from "@/config/config";
import { ProductDto } from "@/dtos/ProductDto";
import axios from "axios";
import { AppError } from "./error";
import { STATUS_CODES } from "./status-codes";
import { logger } from "./logger";

export const getProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${config.catalogUrl}/api/products/${productId}`
    );
    return response.data as ProductDto;
  } catch (error) {
    logger.error(error);
    throw new AppError(STATUS_CODES.BAD_REQUEST, "Product not found");
  }
};