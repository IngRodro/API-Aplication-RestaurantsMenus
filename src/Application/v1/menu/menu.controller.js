import MenuModel from './menu.model';

export const getMenu = async (req, res) => {
  const { offset, limit } = req.params;
  const { idRestaurant } = req.params;

  try {
    const data = await MenuModel.find({ restaurant: idRestaurant, status: 'active' })
      .skip(offset)
      .limit(limit)
      .populate('restaurant', ['_id', 'name'])
      .populate('products.product', ['_id', 'name', 'image']);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createMenu = async (req, res) => {
  const {
    name,
    restaurant,
    products,
    price,
    type,
  } = req.body;

  if (!name || !restaurant || !products || !price || !type) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
      code: 400,
    });
  }

  try {
    const data = await MenuModel.create(
      {
        name,
        restaurant,
        products,
        price,
        type,
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
