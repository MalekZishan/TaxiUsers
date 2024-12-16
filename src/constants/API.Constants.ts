export const ENDPOINTS = {
  login: '/company/auth/Login',
  Register: '/company/auth/Register',
  VerifyEmail: '/company/auth/VerifyEmail',
  EmailOTPVerification: '/company/auth/EmailOTPVerification',
  UpdateProfile: '/company/auth/UpdateProfile',
  ChangePassword: '/company/auth/ChangePassword',

  // Empoyees
  GetEmployees: '/company/EmployeeManagement',
  AddEmployee: '/company/EmployeeManagement',

  // Booking
  AddBooking: '/add-booking',
  NewBookingList: '/NewBookingList',
  PastBookingList: '/PastBookingList',
  RateDriver: '/RateDriver',
  ForgotOTP: '/driver/auth/ForgotOTP',
  NewPassword: '/driver/auth/NewPassword',
  ForgotOtpVerification: '/driver/auth/ForgotOtpVerification',
};
