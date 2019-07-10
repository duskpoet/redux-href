import { Location } from 'history';
export declare const Types: {
    replaceUrl: string;
};
export declare const replaceUrl: (location: Location) => {
    type: string;
    payload: {
        location: Location;
    };
};
