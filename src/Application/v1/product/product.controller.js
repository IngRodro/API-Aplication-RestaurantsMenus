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
    name,
    state,
    image
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
  export const updateProduct = async (req, res) => {
    const { body, params } = req;
    const { idProduct } = params

      if (!body) {
        return res.status(400).json({
          message: 'Todos los campos se deben completar',
        });
      }

      try {
        const data = await ProductModule.findOneAndUpdate(
          { _id: idProduct },
          {
            name: body.name,
            state: body.state,
            image: body.image,
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

