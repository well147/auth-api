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

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public passwordConfirm!: string;
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
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        min: {
          args: [8],
          msg: 'Deve conter entre 8 e 16 caracteres.'
        }
      }
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        async isEqualToPassword(value: string) {
          if (this.password !== value) throw new Error('Senhas não coincidem.');
        }
      }
    }
  },
  {
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10).catch(() => {
          throw new Error('Could not hash password.');
        });
      }
    },
    underscored: true,
    modelName: 'User',
    timestamps: false
  }
);
