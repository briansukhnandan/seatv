// Adds on extra args to request string if necessary.
export function appendToEndpoint(endpoint: string, modifier: string) {
  const endpointParamSplit = endpoint.split('?');
  endpointParamSplit[0] = `${endpointParamSplit[0]}${modifier}`;

  return endpointParamSplit.join('?');
}