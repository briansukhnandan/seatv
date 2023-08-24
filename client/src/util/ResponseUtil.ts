export function isApiResponseValid(res: Response) {
  const invalidErrorCodes = [34, 404, 500];
  return !invalidErrorCodes.includes(res.status);
}

export function validateIdInUrl(idString: string) {
  if (isNaN(parseInt(idString))) {
    throw new Error(
      `Error: ID provided must be a valid number! Found ${idString}`
    );
  }

  return parseInt(idString);
}