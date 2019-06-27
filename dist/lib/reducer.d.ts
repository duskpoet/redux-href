import { AnyAction } from 'redux';
import { LocationToState } from './typings';
declare const reducer: <S>(locationToState: LocationToState<S>) => (state: S, action: AnyAction) => S;
export default reducer;
