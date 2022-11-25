export function isTheMovieDBApiResponseValid(res) {
  const invalidErrorCodes = [34, 404, 500];
  return !invalidErrorCodes.includes(res.status_code);
}