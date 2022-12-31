/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> Match Joi Validations <==> /// ================ */
const matchJoi = {
  /* ================ /// <==> Create-Schema <==> /// ================ */

  createMatchSchema: {
    body: joi
      .object()
      .required()
      .keys({
        team1: joi.string().required(),
        team2: joi.string().required(),

        stadium: joi.string().hex().length(24).required(),
        ticket: joi.number().required(),
        matchTime: joi.number().required(),
        matchDate: joi.date().required(),

        referee: joi.string().required(),
        linesmen1: joi.string().required(),
        linesmen2: joi.string().required(),
        varReferee: joi.string().required(),
      }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  editMatchSchema: {
    body: joi.object().required().keys({
      match: joi.object().required(),
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

/* ============= /// <==> Exports Match Joi Validations <==> /// ============= */
module.exports = matchJoi;
