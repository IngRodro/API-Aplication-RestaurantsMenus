import RestaurantModule from './restaurant.model';

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

export const createExample = async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({
      message: 'Faltan datos, la consulta debe contener fullName y email',
      code: 400,
    });
  }

  try {
    const data = await RestaurantModule.create({ fullName, email });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
