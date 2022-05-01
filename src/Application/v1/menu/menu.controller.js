import fs from 'fs-extra';
import MenuModel from './menu.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';

export const getAllProduct = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await MenuModel.find()
      .skip(offset)
      .limit(limit)
      .populate('restaurant', ['_id', 'name'])
      .populate('products.product', ['_id', 'name', 'price', 'type']);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createProduct = async (req, res) => {
  const {
    name,
    state,
  } = req.body;

  let image = {};

  if (!name || !req.files.image) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
      code: 400,
    });
  }

  try {
    const result = await uploadFile(req.files.image.tempFilePath);
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.logo.tempFilePath);
    const data = await MenuModel.create(
      {
        name,
        state,
        image
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
export const updateProduct = async (req, res) => {
  const { body, params } = req;
  const { idProduct } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
    });
  }

  try {
    let image = {};
    const actualData = await MenuModel.findById(idProduct);
    await deleteFile(actualData.image.public_id);
    const result = await uploadFile(req.files.image.tempFilePath);
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);
    const data = await MenuModel.findOneAndUpdate(
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

  try {
    const data = await MenuModel.findOneAndUpdate(
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
