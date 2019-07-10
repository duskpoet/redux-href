import { History } from 'history';
export interface LocationParams {
    path?: string;
    params?: {
        [name: string]: string;
    };
}
export declare type LocationToState<S> = (href: URL, state: S) => S;
export declare type StateToLocation<S> = (state: S) => LocationParams;
export declare type RehrefParams<S> = {
    locationToState: LocationToState<S>;
    stateToLocation: StateToLocation<S>;
    history: History;
};
