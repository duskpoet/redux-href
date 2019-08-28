import { LocationParams, SearchParams } from './typings';
import { LocationDescriptorObject, Location } from 'history';
export const paramsToLocation = ({ params, path }: LocationParams) => {
  let result: LocationDescriptorObject = {};
  if (path !== undefined) {
    result.pathname = path;
  }
  if (params !== undefined) {
    result.search = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }
  return result;
};

export const locationToParams = (location: Location) => ({
  path: location.pathname,
  params: location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce<SearchParams>((acc, valParam) => {
      const [key, value] = valParam.split('=');
      acc[key] = value;
      return acc;
    }, {}),
});
