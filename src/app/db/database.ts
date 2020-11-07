import { Sequelize } from 'sequelize';

/**
 * Isso seria melhor sendo uma variavel de ambiente, foi declarada como
 * variavel comum para simplificar o uso do app
 */
const DB_STORAGE_PATH = './src/app/db/database.db';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_STORAGE_PATH
});

sequelize
  .authenticate()
  .then(() => console.log('Conexão efetuada com sucesso.'))
  .catch(error => console.error('Conexão falhou: ', error));

export default sequelize;
