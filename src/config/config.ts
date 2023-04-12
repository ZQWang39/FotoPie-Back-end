export const config = () => ({
  // Server post
  port: 9090 || 8080,

  // Frontend url
  frontend_url: process.env.FRONTEND_URL,

  // MongoDB connection url
  host: process.env.MONGO_URL,

  // Login access and refresh token secret key
  access_token_key_private: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
  access_token_key_public: process.env.ACCESS_TOKEN_SECRET_PUBLIC,
  refresh_token_key_private: process.env.REFRESH_TOKEN_SECRET_PRIVATE,
  refresh_token_key_public: process.env.REFRESH_TOKEN_SECRET_PUBLIC,

  // AWS S3 variables
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_access_key_secret: process.env.AWS_ACCESS_KEY_SECRET,

  // JWT encryption secret key
  jwt_activate_secret_key: process.env.JWT_ACTIVATE_SECRET_KEY,

  // Mailgun API key
  mailgun_api_key: process.env.MAILGUN_API_KEY,

  // Stripe server side secret key
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,

  // Stripe webhook secret key
  webhook_signing_secret: process.env.WEBHOOK_SIGNING_SECRET,

  // OpenAI API key
  openai_api_key: process.env.OPENAI_API_KEY,

  everypixel_id: process.env.EVERYPIXEL_ID,

  everypixel_api_key: process.env.EVERYPIXEL_API_KEY,
});
