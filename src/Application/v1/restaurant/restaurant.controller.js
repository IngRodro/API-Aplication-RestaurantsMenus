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

export const createRestaurant = async (req, res) => {
  const {
    name, email, department, municipality, direction,
    delivery, phone, openingHour, closingHour, logo
  } = req.body;

  if (!name || !email || !department || !municipality || !direction
    || !delivery || !phone || !openingHour || !closingHour || !logo) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
      code: 400,
    });
  }

  try {
    const data = await RestaurantModule.create(
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
        logo
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
