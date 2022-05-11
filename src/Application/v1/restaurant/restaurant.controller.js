import fs from 'fs-extra';
import { getPagination } from 'Utils/getPagination';
import RestaurantModel from './restaurant.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';

export const getRestaurantByUser = async (req, res) => {
  const { offset, limit } = req.params;
  const { idUser } = req;

  try {
    const data = await RestaurantModel.find({ status: 'active', user: idUser })
      .skip(offset)
      .limit(limit);
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
  const { department, municipality, page } = req.query;
  const { offset, limit } = getPagination(page, 10);

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
    const restaurants = data.slice(offset, offset + limit);
    return res.status(200).json({
      restaurants,
      currentPage: page || 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset < data.length ? parseInt(page, 10) + 1 : null,
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
    user,
  } = req.body;

  if (
    !name ||
    !department ||
    !municipality ||
    !direction ||
    !delivery ||
    !phone ||
    !openingHour ||
    !closingHour ||
    !user ||
    !req.files
  ) {
    return res.status(400).json({
      message: 'All fields are required',
      code: 400,
    });
  }
  try {
    let logo = {};
    const result = await uploadFile(req.files.logo.tempFilePath);
    logo = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.logo.tempFilePath);

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
      user,
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
    !phone
  ) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  if (!req.files?.logo) {
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
