import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnauthorizedError,
} from "../errors/index.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.CREATED).json({ products, count: products.length });
};

export const createProduct = async (req, res) => {
  const { name, price, um, description } = req.body;
  if (!name || !price || !description) {
    throw new BadRequestError("PLease provide all values");
  }
  req.body.createBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`Not found product with id ${productId}`);
  }
  res.status(StatusCodes.CREATED).json({ product });
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`Not found product with id ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.CREATED).json({ msg: "Succes removed product" });
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { name, price, um, description } = req.body;

  if (!name || !price || !description || !um) {
    throw new BadRequestError("PLease provide all values");
  }

  req.body.createBy = req.user.userId;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`Not found product with id ${productId}`);
  }
  res.status(StatusCodes.CREATED).json({ product });
};
