import fs from 'fs-extra';
import RestaurantModel from './restaurant.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';

export const getAllRestaurant = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const data = await RestaurantModel.find({ status }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createRestaurant = async (req, res) => {
  const {
    name,
    email,
    department,
    municipality,
    direction,
    delivery,
    phone,
    openingHour,
    closingHour,
  } = req.body;

  console.log(req.body);

  if (
    !name
    || !email
    || !department
    || !municipality
    || !direction
    || !delivery
    || !phone
    || !openingHour
    || !closingHour
  ) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
      code: 400,
    });
  }
  try {
    let logo = {};
    if (req.files.logo) {
      const result = await uploadFile(req.files.logo.tempFilePath);
      logo = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.logo.tempFilePath);
    }
    const data = await RestaurantModel.create({
      name,
      email,
      department,
      municipality,
      direction,
      delivery,
      phone,
      openingHour,
      closingHour,
      logo,
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
export const updateRestaurant = async (req, res) => {
  const { body, params } = req;
  const { idRestaurant } = params;

  if (!body || !req.files?.logo) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    let logo = {};
    const actualData = await RestaurantModel.findById(idRestaurant);
    await deleteFile(actualData.logo.public_id);
    const result = await uploadFile(req.files.logo.tempFilePath);
    logo = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.logo.tempFilePath);
    const data = await RestaurantModel.findOneAndUpdate(
      { _id: idRestaurant },
      {
        name: body.name,
        email: body.email,
        department: body.department,
        municipality: body.municipality,
        direction: body.direction,
        delivery: body.delivery,
        phone: body.phone,
        openingHour: body.openingHour,
        closingHour: body.closingHour,
        logo,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo actualizar el registro',
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { idRestaurant } = req.params;

    const data = await RestaurantModel.findOneAndUpdate(
      { _id: idRestaurant },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el registro',
    });
  }
};
