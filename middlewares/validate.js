const joi = require('joi');

/**
 * Validate request parameters
 */
module.exports = function(
  schemas,
  options = {
    allowUnknown: true,
    abortEarly: false,
  },
) {
  return async (ctx, next) => {
    try {
      for (const schema in schemas) {
        if (ctx.request[schema]) {
          let requestSchema = ctx.request[schema];
          requestSchema = schema === 'params' ? ctx.params : requestSchema;

          const validate = joi.validate(requestSchema, schemas[schema], options);

          if (validate.error) {
            ctx.throw(400, validate.error, validate.error);
          }
        }
      }
      await next();
    } catch (e) {
      ctx.throw(e);
    }
  };
};
