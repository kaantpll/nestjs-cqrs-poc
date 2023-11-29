export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  ELASTIC_SEARCH: {
    HOST: process.env.ELASTICSEARCH_NODE,
  },
  KAFKA: {
    HOST: process.env.KAFKA_HOST,
    PRODUCT_TOPIC: process.env.PRODUCT_TOPIC,
    KAFKA_BROKER: process.env.KAFKA_BROKER,
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,
  },

  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
});

export enum ConfigurationKeys {
  KAFKA_HOST = 'KAFKA.HOST',
  KAFKA_PRODUCT_TOPIC = 'KAFKA.PRODUCT_TOPIC',
  KAFKA_BROKER = 'KAFKA.KAFKA_BROKER',
  KAFKA_GROUP_ID = 'KAFKA.KAFKA_GROUP_ID',
  ELASTIC_HOST = 'ELASTIC_SEARCH.HOST',
  DB_HOST = 'DB.HOST',
  DB_PORT = 'DB.PORT',
  DB_USER = 'DB.USER',
  DB_PASSWORD = 'DB.PASSWORD',
  DB_NAME = 'DB.NAME',
}
