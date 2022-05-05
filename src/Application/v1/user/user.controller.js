import restaurantModel from '../restaurant/restaurant.model';

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const data = await restaurantModel.find({ status }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const data = await restaurantModel.create({
      name,
      username,
      password
    });
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Error al registrar usuario',
      code: 500
    });
  }
};
