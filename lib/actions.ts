import { Location } from 'history';
export const Types = {
  replaceUrl: '@@re-href/replace-url',
  dispose: '@@re-href/dispose',
};

export const replaceUrl = (location: Location) => ({
  type: Types.replaceUrl,
  payload: {
    location,
  },
});
export const dispose = () => ({
  type: Types.dispose,
});
