import { Location } from 'history';
export const Types = {
  replaceUrl: '@@re-href/replace-url',
};

export const replaceUrl = (location: Location) => ({
  type: Types.replaceUrl,
  payload: {
    location,
  },
});
