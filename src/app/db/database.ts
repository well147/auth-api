import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './app/db/db.sqlite'
});

sequelize
  .authenticate()
  .then(() => console.log('Conexão efeutada com sucesso.'))
  .catch((error) => console.error('Conexão falhou: ', error));

export default sequelize;
