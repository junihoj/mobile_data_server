export const validateUserEmail = (userEmail: string) => {
  let validRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (validRegEx.test(userEmail)) return false;
  return true;
};

export const validateUserPassword = (userEmail: string) => {
  /* 
    Minimum eight characters, at least one letter and one number:
        "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"


    Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

    Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    */

  const isEmailValid = new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$");
  if (!isEmailValid.test(userEmail)) return false;
  return true;
};
