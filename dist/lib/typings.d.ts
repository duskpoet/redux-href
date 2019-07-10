import { History } from 'history';
export declare type SearchParams = Record<string, string>;
export declare type LocationParams = {
    path?: string;
    params?: SearchParams;
};
export declare type RLocationParams = Required<LocationParams>;
export declare type LocationToState<S> = (location: RLocationParams, state: S) => S;
export declare type StateToLocation<S> = (state: S) => LocationParams;
export declare type RehrefParams<S> = {
    locationToState: LocationToState<S>;
    stateToLocation: StateToLocation<S>;
    history: History;
};
