/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> Stadium Joi Validations <==> /// ================ */
const stadiumJoi = {
  /* ================ /// <==> Signup-Schema <==> /// ================ */

  createStadiumSchema: {
    body: joi.object().required().keys({
      name: joi.string().required(),
      location: joi.string().required(),
      openDate: joi.date().required(),

      seats: joi.number().required(),
      vipSeats: joi.number().required(),
      vipWidth: joi.number().required(),
      vipLength: joi.number().required(),

      exploreMore: joi.string(),
      image: joi.string(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
};

/* ============= /// <==> Exports User Joi Validations <==> /// ============= */
module.exports = stadiumJoi;
