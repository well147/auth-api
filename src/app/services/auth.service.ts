import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import { ValidationErrorItem } from 'sequelize';
import errorHandler from '../helpers/error-handler';
import User, { UserCreationAttributes } from '../models/user.model';
const secret = 'segredo muito secreto, shhhh';

const generateEncryptedToken = (payload: object) => {
  const token = jwt.sign(payload, secret);

  return Buffer.from(token).toString('base64');
};

const decryptToken = (token: string) => {
  return Buffer.from(token, 'base64').toString('utf-8');
};

const createUser = async (data: UserCreationAttributes) => {
  const user = User.build(data);

  const persisted = await user.save().catch((err: ValidationError) => {
    if (err.name === 'SequelizeValidationError') {
      const badRequest = err.errors.some(
        /**
         * Ainda não entendi muito bem o porquê, mas validator key não é acessível
         * dentro do tipo ValidationErrorItem, então tenho que adicionar o any pra
         * que o typescript me deixe acessar.
         */
        (error: ValidationErrorItem | any) => error.validatorKey === 'is_null'
      );

      const statusCode = badRequest ? 400 : 422;

      throw errorHandler('Erro de validação', statusCode, err.errors);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      throw errorHandler('Erro de validação', 422, err.errors);
    }

    throw errorHandler();
  });

  return persisted;
};

export default {
  login: async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (await user.authenticate(password)) {
        const userJSON = user.toJSON();
        const token = generateEncryptedToken({
          ...userJSON,
          password: '[FILTERED]'
        });
        return { token };
      }
    }

    throw errorHandler('Usuário ou senha inválidos', 400);
  },

  signup: async (data: UserCreationAttributes) => {
    const user = await createUser(data);

    if (user) {
      const userJSON = user.toJSON();
      const token = generateEncryptedToken({
        ...userJSON,
        password: '[FILTERED]'
      });
      return { token };
    }

    throw errorHandler();
  },

  me: async (encryptedToken: string) => {
    try {
      const token = decryptToken(encryptedToken);
      return jwt.verify(token, secret) as object;
    } catch (error) {
      throw errorHandler('Token inválido ou vencido', 401);
    }
  }
};
