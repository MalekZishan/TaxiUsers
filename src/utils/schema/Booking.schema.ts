import {t} from 'i18next';
import * as Yup from 'yup';

const BookingformSchema = () =>
  Yup.object().shape({
    full_name: Yup.string()
      .required(t('Full Name is required'))
      .min(3, t('Full Name must be at least 3 characters'))
      .max(40, t('Full Name cannot exceed 40 characters')),
    car_type: Yup.string().required(t('Car Type is required')),
    total_passenger: Yup.number()
      .typeError(t('Total Passenger must be an integer'))
      .required(t('Total Passenger is required'))
      .integer(t('Total Passenger must be a whole number')),
    phone_number: Yup.string()
      .required(t('Phone Number is required'))
      .matches(/^\d+$/, t('Phone Number must contain only numbers'))
      .min(3, t('Phone Number must be at least 3 characters'))
      .max(30, t('Phone Number cannot exceed 30 characters')),
    price: Yup.number()
      .typeError(t('Price must be a number'))
      .required(t('Price is required'))
      .test(
        'is-positive',
        t('Price must be a positive number'),
        value => value > 0,
      ),
  });

export default BookingformSchema;
