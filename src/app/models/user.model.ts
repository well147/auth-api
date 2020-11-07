import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../db/database';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public passwordConfirm!: string;

  async authenticate(password: string) {
    const authenticate = await bcrypt
      .compare(password, this.password)
      .catch(() => {
        return false;
      });

    return authenticate;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Deve conter entre 2 e 50 caracteres.'
        },
        notEmpty: {
          msg: 'Deve ser preenchido.'
        },
        notNull: {
          msg: 'Não pode ser nulo'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'Email',
        msg: 'Endereço de email em uso.'
      },
      validate: {
        isEmail: {
          msg: 'Deve ser um email válido.'
        },
        notEmpty: {
          msg: 'Deve ser preenchido.'
        },
        notNull: {
          msg: 'Não pode ser nulo'
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          /* Não precisa limitar o tamanho máximo da senha já que ela é hasheada,
           * mas não achei um validador so para tamanho mínimo 🤡
           */
          args: [8, 16],
          msg: 'Deve conter entre 8 e 16 caracteres.'
        },
        notNull: {
          msg: 'Não pode ser nulo'
        }
      }
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        async isEqualToPassword(value: string) {
          if (this.password !== value) throw new Error('Senhas não coincidem.');
        },
        notNull: {
          msg: 'Não pode ser nulo'
        }
      }
    }
  },
  {
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10).catch(() => {
          throw new Error('Não foi possível concluir o hash da senha.');
        });
      }
    },
    underscored: true,
    modelName: 'User',
    timestamps: false
  }
);

export default User;
