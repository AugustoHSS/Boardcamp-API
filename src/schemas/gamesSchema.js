import joi from 'joi';

function sendError() {
  return 400;
}
const gamesSchema = joi.object({
  name: joi.string().required().error(() => sendError),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().required(),
  categoryId: joi.number().integer().required(),
  pricePerDay: joi.number().required(),
});

export default gamesSchema;
