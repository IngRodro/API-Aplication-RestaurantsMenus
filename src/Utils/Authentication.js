import jwt from 'jsonwebtoken';

import getConfig from 'config';

const { Token } = getConfig();

export const TokenValidation = (req, res, next) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({
        message: 'Access Denied',
        code: 401,
      });
    }
    const payload = jwt.verify(token, Token.secret || '');
    req.idUser = payload.idUser;
    return next();
  } catch (e) {
    return res.status(400).send({
      message: 'Invalid Token',
      code: 400,
    });
  }
};

export function genToken(idUser) {
  return jwt.sign({ idUser }, Token.secret, {
    expiresIn: '1d',
  });
}
