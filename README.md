# redux-href
[![Build Status](https://travis-ci.com/duskpoet/redux-href.svg?branch=master)](https://travis-ci.com/duskpoet/redux-href)

## Simple routing management in library written in typescript for redux.

```ts
import { createStore } from 'redux';
import rehref from 'redux-href';

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

const rehrefEnhancer = rehref<State>(
  (url, state) => ({
    ...state,
    page: Number(url.searchParams.get('page')),
  }),
  (state) => ({
    params: {
      page: String(state.page),
    },
  })
);

const store = createStore(reducer, {}, rehrefEnhancer);
```

## API

### rehref (
  locationToState: LocationToState,
  stateToLocation: StateToLocation
) => StoreEnhancer

`type LocationToState<S> = (href: URL, state: S) => S`
Function that takes current href as [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) object, current state and returns actual state. It will be called on every popstate event.

```ts
interface LocationParams {
  path?: string; // path part of url, like "full/path" in example.com/full/path
  params?: { [name: string]: string }; // query params in url
}

type StateToLocation<S> = (state: S) => LocationParams
```
Function that takes current state and returns object, that will be used to update current location.
It will be called on every dispatch to calculate location params. If returned object equals to previous result, no update will be performed.

If you need to replace history instead of creating a new record, then include `replaceHistory: true` as a part of action object.
```ts
dispatch({
    type: "some_action",
    payload: "some_data",
    meta: { replaceHistory: true },
})
```
