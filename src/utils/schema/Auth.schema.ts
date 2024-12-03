import * as yup from 'yup';
import {Email, stringValidation, yupObj} from './validation.schema';

export const registerSchema = () =>
  yupObj.shape({
    full_name: stringValidation('Full name '),
    phone_number: stringValidation('Mobile number', 2),
    company_name: stringValidation('Company Name', 2),
    email: Email,
    password: stringValidation('Password'),
  });
export const loginSchema = yupObj.shape({
  email: Email,
  password: stringValidation('Password'),
});

export const changePassSchema = () =>
  yupObj.shape({
    oldPassword: stringValidation('Old Password'),
    newPassword: stringValidation('New Password', 6, 15),
    confirmPassword: stringValidation('Confirm Password', 6, 15).oneOf(
      [yup.ref('newPassword'), ''],
      'Passwords must match',
    ),
  });
export const editProfileSchema = () =>
  yupObj.shape({
    full_name: stringValidation('Full name'),
  });
