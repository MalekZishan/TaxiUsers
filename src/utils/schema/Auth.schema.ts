import * as yup from 'yup';
import {Email, stringValidation, yupObj} from './validation.schema';

export const registerSchema = () =>
  yupObj.shape({
    fullName: stringValidation('Full name '),

    countryCode: stringValidation('Country code'),
    mobileNumber: stringValidation('Mobile number', 2),
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

export const vehicleAddSchema = () =>
  yupObj.shape({
    vehicle_brand: stringValidation('Vehicle Brand'),
    vehicle_model: stringValidation('Vehicle Model'),
    vehicle_year: stringValidation('Year'),
    licence_plate: stringValidation('License Plate'),
    color: stringValidation('Color'),
  });

export const vehicleDocSchema = () =>
  yupObj.shape({
    from_location: stringValidation('this'),
    to_location: stringValidation('this'),
    from_loc_lat: stringValidation('this'),
    from_loc_long: stringValidation('this'),
    to_loc_lat: stringValidation('this'),
    to_loc_long: stringValidation('this'),
    license_number: stringValidation('License Preference'),
    insurance: stringValidation('this'),
  });

export const editProfileSchema = () =>
  yupObj.shape({
    fullName: stringValidation('Full name'),
    mobileNumber: stringValidation('Mobile number'),
    email: Email,
  });
