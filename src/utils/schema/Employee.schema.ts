import {Email, stringValidation, yupObj} from './validation.schema';

export const AddEmployeeSchema = () =>
  yupObj.shape({
    full_name: stringValidation('Full name'),
    phone_number: stringValidation('Phone Number'),
    email: Email,
    password: stringValidation('Password'),
  });
