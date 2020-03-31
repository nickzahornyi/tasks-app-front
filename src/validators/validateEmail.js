import * as EmailValidator from 'email-validator';

import { validateInput } from './validateInput';

const validateEmailData = (value) => {
  const isEmailValid = EmailValidator.validate(value);

  return !isEmailValid ? `Email is not valid` : '';
}

export const validateEmail = (value) => {
  const isFieldEmpty = validateInput(value);
  const isEmailNotValid = validateEmailData(value);
  let error;

  if (isFieldEmpty) {
    error = isFieldEmpty;
  } else if (isEmailNotValid) {
    error = isEmailNotValid;
  }

  return error;
}