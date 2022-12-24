// ===== --- ===== ### User-Regex ### ===== --- ===== //
const validName = new RegExp(
  // Valid name
  /^[A-Za-z0-9]+$/
);

const validEmail = new RegExp(
  //Valid email
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

const validPassword = new RegExp(
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character;
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/
);

const validGender = new RegExp(
  // Valid Gender
  /(male|female)/
);

export const userRegex = {
  username: validName,
  password: validPassword,
  firstName: validName,
  lastName: validName,
  email: validEmail,

  birthDate: "",
  gender: validGender,
  nationality: "",
};
