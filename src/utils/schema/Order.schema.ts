import { addStrValidation, stringValidation, yupObj } from "./validation.schema";

export const createOfferSchema = () =>
  yupObj.shape({
    booking_date: stringValidation("Date"),
    booking_time: stringValidation("Time"),
    pick_address: stringValidation("Pickup Route"),
    pick_lat: addStrValidation(),
    pick_long: addStrValidation(),
    drop_address: stringValidation("Deliver Route"),
    drop_lat: addStrValidation(),
    drop_long: addStrValidation(),
    price: stringValidation("Price"),
    km: stringValidation("Km"),
    description: stringValidation("Description"),
    height: stringValidation("Height"),
    weight: stringValidation("weight"),
    width: stringValidation("width"),
    city_name: stringValidation("City Name"),
  });
