import { Location } from 'history';
export declare const Types: {
    replaceUrl: string;
    dispose: string;
};
export declare const replaceUrl: (location: Location) => {
    type: string;
    payload: {
        location: Location;
    };
};
export declare const dispose: () => {
    type: string;
};
