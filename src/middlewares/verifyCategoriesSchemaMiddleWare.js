import categoriesSchema from '../schemas/categoriesSchema.js';

export default function verifyCategoriesSchemaMiddleware(request, response, next) {
  if (request.body.name === '') return response.sendStatus(400);
  const validation = categoriesSchema.validate(request.body);
  if (validation.error) {
    return response.sendStatus(422);
  }
  next();
}
