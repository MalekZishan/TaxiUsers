import * as yup from 'yup';
import {Email, stringValidation, yupObj} from './validation.schema';
import {t} from 'i18next';

export const registerSchema = () =>
  yupObj.shape({
    full_name: stringValidation(t('Full name ')),
    phone_number: stringValidation(t('Mobile number'), 2),
    company_name: stringValidation(t('Company Name'), 2),
    email: Email,
    password: stringValidation(t('Password')),
  });
export const loginSchema = () =>
  yupObj.shape({
    email: Email,
    password: stringValidation(t('Password')),
  });

export const changePassSchema = () =>
  yupObj.shape({
    oldPassword: stringValidation(t('Old Password')),
    newPassword: stringValidation(t('New Password'), 6, 15),
    confirmPassword: stringValidation(t('Confirm Password'), 6, 15).oneOf(
      [yup.ref('newPassword'), ''],
      t('Passwords must match'),
    ),
  });
export const editProfileSchema = () =>
  yupObj.shape({
    full_name: stringValidation(t('Full name')),
  });
