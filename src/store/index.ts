import { createQueryListener } from 'datavoyager/build/store/listener';
import { applyMiddleware, compose, createStore, Middleware, Store, StoreEnhancer } from 'redux';
import { createActionLog } from 'redux-action-log';
import thunkMiddleware from 'redux-thunk';
import { StoreState, DEFAULT_STATE } from '../models';
import { reducer } from '../reducers';

// define which middleware to use depending on environment
let composeEnhancers = compose;
const middleware: Middleware[] = [thunkMiddleware];

export let actionLogs: any;
export function configureStore(initialState: StoreState = DEFAULT_STATE) {
  actionLogs = createActionLog({limit: null});

  const store: Store<StoreState> = createStore<StoreState>(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), actionLogs.enhancer) as StoreEnhancer<any>
    // HACK: cast to any to supress typescript complaint
  );

  store.subscribe(createQueryListener(store));
  return store;
}
