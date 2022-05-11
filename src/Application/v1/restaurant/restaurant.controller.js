import fs from 'fs-extra';
import { getPagination } from 'Utils/getPagination';
import RestaurantModel from './restaurant.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';

export const getRestaurantByUser = async (req, res) => {
  const { idUser } = req;

  try {
    const data = await RestaurantModel.find({ status: 'active', user: idUser });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
      code: 500,
    });
  }
};

export const getRestaurantByLocation = async (req, res) => {
  const { department, municipality, page, size } = req.query;
  const { offset, limit } = getPagination(page, size);

  try {
    const data = await RestaurantModel.find({
      department,
      municipality,
      status: 'active',
    });
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const restaurants = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      restaurants,
      currentPage: page ? parseInt(page, 10) : 1,
      numberOfItems: restaurants.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: (offset + restaurants.length) < data.length ? parseInt(page || 1, 10) + 1 : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
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

  const { idUser } = req;

  if (
    !name ||
    !department ||
    !municipality ||
    !direction ||
    !delivery ||
    !phone ||
    !openingHour ||
    !closingHour ||
    !idUser
  ) {
    return res.status(400).json({
      message: 'All fields are required',
      code: 400,
    });
  }
  if (!req.files?.image) {
    return res.status(400).json({
      message: 'Not file uploaded',
      code: 400,
    });
  }
  try {
    let image = {};
    const result = await uploadFile(req.files.image.tempFilePath, 'restaurants');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);

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
      image,
      user: idUser,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating new restaurant',
      code: 500,
    });
  }
};
export const updateRestaurant = async (req, res) => {
  const { idRestaurant } = req.params;
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

  if (
    !name ||
    !department ||
    !municipality ||
    !direction ||
    !delivery ||
    !phone ||
    !openingHour ||
    !closingHour
  ) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  if (!req.files?.image) {
    try {
      const data = await RestaurantModel.findOneAndUpdate(
        { _id: idRestaurant },
        {
          name,
          email,
          department,
          municipality,
          direction,
          delivery,
          phone,
          openingHour,
          closingHour,
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating restaurant',
        code: 500,
      });
    }
  }

  try {
    let image = {};
    const actualData = await RestaurantModel.findById(idRestaurant);
    await deleteFile(actualData.image.public_id);
    const result = await uploadFile(req.files.image.tempFilePath, 'restaurants');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);
    const data = await RestaurantModel.findOneAndUpdate(
      { _id: idRestaurant },
      {
        name,
        email,
        department,
        municipality,
        direction,
        delivery,
        phone,
        openingHour,
        closingHour,
        image,
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Don't cant update the restaurant",
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
      message: "Don't cant delete the restaurant",
    });
  }
};
