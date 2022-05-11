import fs from 'fs-extra';
import { getPagination } from 'Utils/getPagination';
import ProductModel from './product.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';
import { verifiedProductOnMenu } from '../menuOptions/menuOptions.controller';

export const getAllProduct = async (req, res) => {
  const { idUser } = req;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await ProductModel.find({
      user: idUser,
      status: 'active',
    });
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const products = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      products,
      currentPage: page ? parseInt(page, 10) : 1,
      numberOfItems: products.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset + products.length < data.length ? parseInt(page, 10) + 1 : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createProduct = async (req, res) => {
  const { name } = req.body;
  const { files, idUser } = req;

  if (!files) {
    return res.status(400).json({
      message: 'Not file uploaded',
    });
  }

  try {
    let image = {};
    const result = await uploadFile(req.files.image.tempFilePath, 'products');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    const product = await ProductModel.create({
      name,
      user: idUser,
      image,
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating product',
      code: 500,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { idProduct } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  if (!req.files?.image) {
    const data = await ProductModel.findOneAndUpdate(
      { _id: idProduct },
      {
        name,
      }
    );
    return res.status(200).json(data);
  }

  try {
    let image = {};
    const actualData = await ProductModel.findById(idProduct);
    await deleteFile(actualData.image.public_id);
    const result = await uploadFile(req.files.image.tempFilePath, 'products');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);
    const data = await ProductModel.findOneAndUpdate(
      { _id: idProduct },
      {
        name,
        image,
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error updating product',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { idProduct } = req.params;

  const validate = await verifiedProductOnMenu(idProduct);
  if (validate) {
    return res.status(400).json({
      message:
        "The product is being used in a menu option, you can't delete it",
      code: 400,
    });
  }

  try {
    const data = await ProductModel.findOneAndUpdate(
      { _id: idProduct },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error deleting product',
    });
  }
};
