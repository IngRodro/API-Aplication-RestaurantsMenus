const {
  APP_PORT,
  APP_DATABASE_URL,
  APP_DATABASE_URL_TEST,
  APP_CLOUD_NAME,
  APP_API_KEY,
  APP_API_SECRET,
  NODE_ENV,
  TOKEN_SECRET,
} = process.env;
const config = () => ({
  port: APP_PORT || 8080,
  database: {
    uri: NODE_ENV === 'test' ? APP_DATABASE_URL_TEST : APP_DATABASE_URL,
    options: {},
  },
  imageCloud: {
    cloud_name: APP_CLOUD_NAME,
    api_key: APP_API_KEY,
    api_secret: APP_API_SECRET,
  },
  Token: {
    secret: TOKEN_SECRET,
  },
});

export default config;
