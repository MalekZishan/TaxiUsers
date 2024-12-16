import {object, string} from 'yup';
import {emailReg} from '../../constants/Utils';
import {t} from 'i18next';

export const stringValidation = (name: string, min = 1, max = 255) => {
  return string()
    .required(`${name as any} ${t('is required')}`)
    .min(
      min,
      `${name as any} ${t('must be at least')} ${min} ${t('characters long')}`,
    )
    .max(
      max,
      `${name as any} ${t('must be at most')} ${max} ${t('characters long')}`,
    )
    .trim();
};

export const customStringValidation = (message: string) => {
  return string().required(message).trim();
};

export const addStrValidation = () => {
  return customStringValidation(t('Invalid Address Choose Different Address'));
};

export const yupObj = object();

export const Email = string()
  .matches(emailReg, {message: t('Invalid Email')})
  .required(t('Email is required'));
