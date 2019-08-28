import { LocationParams } from './typings';
import { LocationDescriptorObject, Location } from 'history';
export declare const paramsToLocation: ({ params, path }: LocationParams) => LocationDescriptorObject;
export declare const locationToParams: (location: Location) => {
    path: string;
    params: Record<string, string>;
};
