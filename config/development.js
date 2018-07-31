module.exports = {
    port: process.env.PORT || 3000,
    website: {
      host: process.env.WEBSITE_HOST || 'http://localhost:3000',
    },
    jwt: {
      secret: process.env.JWT_SECRET || '}(f#fGp+Zo#sj`-_A}W7!9xn~CB+#3<Y',
      options: {
        expiresIn: process.env.JWT_OPTIONS_EXPIRES_IN || '36h',
      },
    },
    mongo: {
      port: process.env.MONGO_PORT || 27017,
      host: process.env.MONGO_ADDRESS || 'localhost',
      db: process.env.MONGO_DATABASE || 'BorderGuru',
      user: process.env.MONGO_USER || '',
      password: process.env.MONGO_PASSWORD || '',
    },
  };
  