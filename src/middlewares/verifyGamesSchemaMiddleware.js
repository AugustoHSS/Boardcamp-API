import gamesSchema from '../schemas/gamesSchema.js';

export default function verifyGamesSchemaMiddleware(request, response, next) {
  const validation = gamesSchema.validate(request.body);
  if (validation.error) {
    return response.sendStatus(422);
  }
  next();
}
