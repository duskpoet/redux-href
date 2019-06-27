import { AnyAction } from 'redux';

import { LocationToState } from './typings';
import { Types } from './actions';

const reducer = <S>(locationToState: LocationToState<S>) => (
  state: S,
  action: AnyAction
) => {
  switch (action.type) {
    case Types.replaceUrl: {
      const { href } = action.payload;
      const url = new URL(href);
      return locationToState(url, state);
    }
    default:
      return state;
  }
};
export default reducer;
