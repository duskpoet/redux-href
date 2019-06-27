export interface LocationParams {
  path?: string;
  params?: { [name: string]: string };
}
export type LocationToState<S> = (href: URL, state: S) => S;
export type StateToLocation<S> = (state: S) => LocationParams;

export type RehrefParams<S> = {
  locationToState: LocationToState<S>;
  stateToLocation: StateToLocation<S>;
};
