import {stringValidation, yupObj} from './validation.schema';

export const AddTeaSchema = () =>
  yupObj.shape({
    teaBrand: stringValidation('Tea brand'),
    teaName: stringValidation('Tea name'),
    teaType: stringValidation('Tea Type'),
  });
