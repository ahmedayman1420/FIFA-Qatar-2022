/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> User Joi Validations <==> /// ================ */
/*
//==//userJoi is an object that contains all user apis schemas to check the validity of sent request.
this object attribures are [signupSchema, signinSchema, googleSigninSchema].
*/
const userJoi = {
  /* ================ /// <==> Signup-Schema <==> /// ================ */

  signupSchema: {
    body: joi
      .object()
      .required()
      .keys({
        username: joi.string().required(),
        password: joi.string().required(),

        firstName: joi.string().required(),
        lastName: joi.string().required(),

        birthDate: joi.date().required(),
        gender: joi.string().required(),

        nationality: joi.string(),

        email: joi
          .string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
      }),
  },

  /* ================ /// <==> Signin-Schema <==> /// ================ */

  signinSchema: {
    body: joi.object().required().keys({
      username: joi.string().required(),
      password: joi.string().required(),
    }),
  },

  /* ================ /// <==> Google-Schema <==> /// ================ */

  googleSigninSchema: {
    body: joi
      .object()
      .required()
      .keys({
        username: joi.string().required(),

        firstName: joi.string().required(),
        lastName: joi.string().required(),

        email: joi
          .string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
      }),
  },

  /* ================ /// <==> Get-Users-Schema <==> /// ================ */

  getUserSchema: {
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  /* ================ /// <==> Approve-User-Auxthority-Schema <==> /// ================ */

  approveUserAuthoritySchema: {
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
  },

  /* ================ /// <==> Delete-User-Schema <==> /// ================ */
  deleteUserSchema: {
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
  },
};

/* ============= /// <==> Exports User Joi Validations <==> /// ============= */
module.exports = userJoi;
