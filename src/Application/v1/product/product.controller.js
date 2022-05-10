import fs from 'fs-extra';
import { getPagination } from 'Utils/getPagination';
import ProductModel from './product.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';
import { verifiedProductOnMenu } from '../menuOptions/menuOptions.controller';

export const getAllProduct = async (req, res) => {
  const { idRestaurant } = req.params;
  const { page = 1 } = req.query;
  const { limit, offset } = getPagination(page, 1);

  try {
    const data = await ProductModel.find({
      restaurant: idRestaurant,
      status: 'active',
    });
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const products = data.slice(offset, offset + limit);
    return res.status(200).json({
      products,
      currentPage: page,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: (offset + limit) < data.length ? parseInt(page, 10) + 1 : null,
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
  const { name, idRestaurant } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      message: 'No se ha seleccionado un archivo',
    });
  }

  try {
    let image = {};
    const result = await uploadFile(req.files.image.tempFilePath);
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    const product = await ProductModel.create({
      name,
      restaurant: idRestaurant,
      image,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al crear el producto',
      code: 500,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { body, params } = req;
  const { idProduct } = params;

  if (!body || !req.files) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
    });
  }

  try {
    let image = {};
    const actualData = await ProductModel.findById(idProduct);
    await deleteFile(actualData.image.public_id);
    const result = await uploadFile(req.files.image.tempFilePath);
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);
    const data = await ProductModel.findOneAndUpdate(
      { _id: idProduct },
      {
        name: body.name,
        image,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error al actualizar los datos',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { params } = req;
  const { idProduct } = params;

  const validate = await verifiedProductOnMenu(idProduct);
  if (validate) {
    return res.status(400).json({
      message:
        'El producto no se puede eliminar porque esta asociado a un menu',
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
      message: 'Error al eliminar los datos',
    });
  }
};
