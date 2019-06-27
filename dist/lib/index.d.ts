import { StoreEnhancerStoreCreator } from 'redux';
import { RehrefParams } from './typings';
export declare const factory: <S>({ locationToState, stateToLocation, }: RehrefParams<S>) => (createStore: StoreEnhancerStoreCreator<{}, {}>) => StoreEnhancerStoreCreator<{}, {}>;
