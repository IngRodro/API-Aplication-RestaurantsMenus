import { getPagination } from 'Utils/getPagination';
import MenuModel from './menuOptions.model';

export const verifiedProductOnMenu = async (idProduct) => {
  const data = await MenuModel.find({
    status: 'active',
  })
    .populate('restaurant', ['_id', 'name'])
    .populate('products.product', ['_id', 'name', 'image']);
  const dataParse = JSON.parse(JSON.stringify(data));
  let result = false;
  await dataParse.forEach((element) => {
    element.products.forEach((product) => {
      if (product.product.id === idProduct) {
        result = true;
      }
    }
    );
  });
  console.log(result);
  return result;
};

export const getMenu = async (req, res) => {
  const { idRestaurant } = req.params;
  const { page = 1 } = req.query;
  const { limit, offset } = getPagination(page, 1);

  try {
    const data = await MenuModel.find({
      restaurant: idRestaurant,
      status: 'active',
    })
      .populate('restaurant', ['_id', 'name'])
      .populate('products.product', ['_id', 'name', 'image']);
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const menus = data.slice(offset, offset + limit);
    return res.status(200).json({
      menus,
      currentPage: page,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset + limit < data.length ? parseInt(page, 10) + 1 : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createMenu = async (req, res) => {
  const { name, restaurant, products, price, type } = req.body;

  if (!name || !restaurant || !products || !price || !type) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
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
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
export const updateMenu = async (req, res) => {
  const { body, params } = req;
  const { idMenu } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
    });
  }

  try {
    const data = await MenuModel.findOneAndUpdate(
      { _id: idMenu },
      {
        name: body.name,
        products: body.products,
        price: body.price,
        type: body.type,
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
      message: 'Error al eliminar los datos',
    });
  }
};
