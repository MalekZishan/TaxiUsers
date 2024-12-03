export type NewBookingResponseRoot = {
  code: number;
  data: NewBookingResponse[];
  message: string;
  pagination: Pagination;
  status: number;
};

export interface NewBookingResponse {
  car_type: string;
  date_created: string;
  driver_detail: null | Driver_detail;
  driver_id: null;
  drop_of_adds: string;
  drop_of_lat: number;
  drop_of_lng: number;
  full_name: string;
  id: number;
  phone_number: string;
  pick_up_adds: string;
  pick_up_lat: number;
  pick_up_lng: number;
  price: number;
  total_passenger: number;
  status: string;
}

export interface Pagination {
  has_next: boolean;
  next_id: null;
}

export type Driver_detail = {
  full_name: string;
  id: number;
  phone_number: string;
  profile_pic: string;
};

export interface PastBoookingResponse {
  car_type: string;
  date_created: string;
  driver_detail: null | Driver_detail;
  driver_id: null;
  drop_of_adds: string;
  drop_of_lat: number;
  drop_of_lng: number;
  full_name: string;
  id: number;
  phone_number: string;
  pick_up_adds: string;
  pick_up_lat: number;
  pick_up_lng: number;
  price: number;
  total_passenger: number;
  status: string;
  user_rate: null | number;
  payment_status: string;
}
