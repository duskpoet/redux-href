import { StoreEnhancerStoreCreator } from 'redux';
import { RehrefParams } from './typings';
import { dispose } from './actions';
export declare const factory: <S>({ locationToState, stateToLocation, history, }: RehrefParams<S>) => (createStore: StoreEnhancerStoreCreator<{}, {}>) => StoreEnhancerStoreCreator<{}, {}>;
export { dispose };
