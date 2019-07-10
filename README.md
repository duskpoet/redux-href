# redux-href
[![Build Status](https://travis-ci.com/duskpoet/redux-href.svg?branch=master)](https://travis-ci.com/duskpoet/redux-href)

## Simple routing and query params management library written in typescript for redux.
It also uses `history` for location and history management, so it's compatible nodejs and react-router.

```ts
import { createStore } from 'redux';
import rehref from 'redux-href';
import { createMemoryHistory } from 'history';

import reducer from './reducer';

interface State {
  name: string;
  userId: string;
  page: number;
}

const initialState: State = {
  name: '',
  userId: '',
  page: 0,
};

const rehrefEnhancer = rehref<State>({
  locationToState: (url, state) => ({
    ...state,
    page: Number(url.params.page),
  }),
  stateToLocation: (state) => ({
    params: {
      page: String(state.page),
    },
  }),
  history: createMemoryHistory(),
});

const store = createStore(reducer, rehrefEnhancer);
```

## API
```ts
rehref (options: {
  locationToState: LocationToState,
  stateToLocation: StateToLocation,
  history: History,
}) => StoreEnhancer

interface LocationParams {
  path?: string; // path part of url, like "full/path" in example.com/full/path
  params?: { [name: string]: string }; // query params in url
}

/**
Function that takes current href as [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) object, current state and returns actual state. It will be called on every popstate event.
*/
`type LocationToState<S> = (location: LocationParams, state: S) => S`

/**
 * Function that takes current state and returns object, that will be used to update current location.
 * It will be called on every dispatch to calculate location params. If returned object equals to previous result, no update will be performed.
 */
type StateToLocation<S> = (state: S) => LocationParams
```

If you need to push history (creating new history record) instead of replacing, then include `pushHistory: true` as a part of action object meta.
```ts
dispatch({
    type: "some_action",
    payload: "some_data",
    meta: { pushHistory: true },
})
```
