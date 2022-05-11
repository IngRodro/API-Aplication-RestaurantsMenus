import { getPagination } from 'Utils/getPagination';
import MenuModel from './menuOptions.model';

export const verifiedProductOnMenu = async (idProduct) => {
  const data = await MenuModel.find({
    status: 'active',
  })
    .populate('products.product', ['_id', 'name', 'image']);
  const dataParse = JSON.parse(JSON.stringify(data));
  let result = false;
  await dataParse.forEach((menuOption) => {
    menuOption.products.forEach((product) => {
      if (product.product.id === idProduct) {
        result = true;
      }
    });
  });
  return result;
};

export const getMenu = async (req, res) => {
  const { idRestaurant } = req.params;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await MenuModel.find({
      restaurant: idRestaurant,
      status: 'active',
    })
      .populate('products.product', ['_id', 'name', 'image']);
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const menus = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      menus,
      currentPage: page,
      numberOfItems: menus.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: (offset + menus.length) < data.length ? parseInt(page, 10) + 1 : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
      code: 500,
    });
  }
};

export const createMenu = async (req, res) => {
  const { name, restaurant, products, price, type } = req.body;

  if (!name || !restaurant || !products || !price || !type) {
    return res.status(400).json({
      message: 'All fields are required',
      code: 400,
    });
  }

  try {
    const data = await MenuModel.create({
      name,
      restaurant,
      products,
      price,
      type,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating Option menu',
      code: 500,
    });
  }
};
export const updateMenu = async (req, res) => {
  const { name, products, price, type } = req.body;
  const { idMenu } = req.params;

  if (!name || !products || !price || !type) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  try {
    const data = await MenuModel.findOneAndUpdate(
      { _id: idMenu },
      {
        name,
        products,
        price,
        type,
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error updating Option menu',
    });
  }
};

export const deleteMenu = async (req, res) => {
  const { params } = req;
  const { idMenu } = params;

  try {
    const data = await MenuModel.findOneAndUpdate(
      { _id: idMenu },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error deleting Option menu',
    });
  }
};
