import {t} from 'i18next';
import {Email, stringValidation, yupObj} from './validation.schema';

export const AddEmployeeSchema = () =>
  yupObj.shape({
    full_name: stringValidation(t('Full name')),
    phone_number: stringValidation(t('Phone Number')),
    email: Email,
    password: stringValidation(t('Password')),
  });
