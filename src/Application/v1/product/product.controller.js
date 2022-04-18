import ProductModule from './product.model';

export const getAllProduct = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await ProductModule.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createProduct = async (req, res) => {
  const {
    name, state, image
  } = req.body;

  if (!name || !image) {
    return res.status(400).json({
      message: 'Todos los campos se deben completar',
      code: 400,
    });
  }

  try {
    const data = await ProductModule.create(
      {
        name,
        state,
        image
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
