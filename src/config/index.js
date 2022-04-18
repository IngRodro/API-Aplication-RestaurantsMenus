const config = () => ({
  port: process.env.APP_PORT || 8080,
  database: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
  imageCloud: {
    cloud_name: process.env.APP_CLOUD_NAME,
    api_key: process.env.APP_API_KEY,
    api_secret: process.env.APP_API_SECRET,
  },
});

export default config;
