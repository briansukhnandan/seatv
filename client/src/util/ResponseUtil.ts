export function isApiResponseValid(res: Response) {
  const invalidErrorCodes = [34, 404, 500];
  return !invalidErrorCodes.includes(res.status);
}