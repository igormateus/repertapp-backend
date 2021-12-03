export default () => ({
  app: {
    name: process.env.APP_NAME || 'no name',
    description: process.env.APP_DESCRIPTION || 'no description',
    version: process.env.APP_VERSION || 'no version',
  },
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    salt: parseInt(process.env.JWT_SALT) || 10,
  },
});
