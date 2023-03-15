export const config = () => ({
  port: parseInt(process.env.SERVER_PORT) || 8080,

  host: process.env.MONGO_URL,

  access_token_key_private: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
  access_token_key_public: process.env.ACCESS_TOKEN_SECRET_PUBLIC,
  refresh_token_key_private: process.env.REFRESH_TOKEN_SECRET_PRIVATE,
  refresh_token_key_public: process.env.REFRESH_TOKEN_SECRET_PUBLIC,
});
