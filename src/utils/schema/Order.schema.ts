import {t} from 'i18next';
import {addStrValidation, stringValidation, yupObj} from './validation.schema';

export const createOfferSchema = () =>
  yupObj.shape({
    booking_date: stringValidation(t('Date')),
    booking_time: stringValidation(t('Time')),
    pick_address: stringValidation(t('Pickup Route')),
    pick_lat: addStrValidation(),
    pick_long: addStrValidation(),
    drop_address: stringValidation(t('Deliver Route')),
    drop_lat: addStrValidation(),
    drop_long: addStrValidation(),
    price: stringValidation(t('Price')),
    km: stringValidation(t('Km')),
    description: stringValidation(t('Description')),
    height: stringValidation(t('Height')),
    weight: stringValidation(t('weight')),
    width: stringValidation(t('width')),
    city_name: stringValidation(t('City Name')),
  });
