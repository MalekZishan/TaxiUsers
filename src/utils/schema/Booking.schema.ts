import * as Yup from 'yup';

const BookingformSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters')
    .max(40, 'Full Name cannot exceed 40 characters'),
  car_type: Yup.string().required('Car Type is required'),
  total_passenger: Yup.number()
    .typeError('Total Passenger must be an integer')
    .required('Total Passenger is required')
    .integer('Total Passenger must be a whole number'),
  phone_number: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d+$/, 'Phone Number must contain only numbers')
    .min(3, 'Phone Number must be at least 3 characters')
    .max(30, 'Phone Number cannot exceed 30 characters'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .test('is-positive', 'Price must be a positive number', value => value > 0),
});

export default BookingformSchema;
