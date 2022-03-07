import joi from 'joi';
import JoiDate from '@joi/date';

const joiExtended = joi.extend(JoiDate);

const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
  cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
  birthday: joiExtended.date().format('YYYY-MM-DD').less('now').required(),
});

export default customersSchema;
