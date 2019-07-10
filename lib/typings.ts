import { History } from 'history';
export type SearchParams = Record<string, string>;
export type LocationParams = {
  path?: string;
  params?: SearchParams;
};
export type RLocationParams = Required<LocationParams>;
export type LocationToState<S> = (location: RLocationParams, state: S) => S;
export type StateToLocation<S> = (state: S) => LocationParams;

export type RehrefParams<S> = {
  locationToState: LocationToState<S>;
  stateToLocation: StateToLocation<S>;
  history: History;
};
