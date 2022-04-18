import fs from 'fs-extra';
import RestaurantModule from './restaurant.model';
import { uploadFile } from '../../../Utils/cloudFile';

export const getAllRestaurant = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await RestaurantModule.find().skip(offset).limit(limit);
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
      console.log(req.files.logo);
      const result = await uploadFile(req.files.logo.tempFilePath);
      logo = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.logo.tempFilePath);
    }
    const data = await RestaurantModule.create({
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
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
