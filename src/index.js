import { createStore } from 'redux';
import { addTodo } from './actions';
import todoApp from './reducers';

const store = createStore(todoApp);

// Log the initial state
console.log(store.getState());

function patchStoreToAddLogging(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  }
}

// Dummy
const Raven = {
  captureException: function(err, optional) {
    console.error(err);
    console.log(optional);
  },
};

function patchStoreToAddCrashReporting(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      console.error('Caught an exception!', err);
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState(),
        },
      });
      throw err;
    }
  }
}

patchStoreToAddLogging(store);
patchStoreToAddCrashReporting(store);

store.dispatch(addTodo('Use Redux'));
