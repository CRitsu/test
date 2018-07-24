// reducers

import { combineReducers } from 'redux';
import ReducerChain from 'reduce-reducers';
import { find } from 'lodash';

import {
  getTime,
  setStorage,
  getStorage,
} from './utils';

import {
  TIME_UPDATE,
  TOGGLE_MENU,
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_SHOW,
  INPUT,
  OPEN_POPUP,
  CLOSE_POPUP,
  CLOSE_AND_SAVE_POPUP,
  POP_VALUE_CHANGED,
  CHANGE_COLOR,
} from './actions';


// update current time
const time = (state = getTime(), action) => {
  switch (action.type) {
    case TIME_UPDATE:
      return getTime();
    default:
      return state;
  }
}

// toggle mene show flag when button clicked
const toggleMenu = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
}


// Todos reducer
const todos = (state, action) => {
  if (action.type === ADD_TODO) {
    // check null string
    let msg = action.payload.message
    if (!msg) return state;

    // get the copy of todo list
    let n = state.slice();
    
    let obj = {
      id: new Date().getTime(),
      message: msg,
      completed: false,
      update: new Date().getTime()
    }

    // add the new one to the first
    n.unshift(obj);
    
    // storage data to localStorage
    setStorage('todos', n);

    return n;
  } else if (action.type === TOGGLE_TODO) {
    let s = state.slice();
    s.forEach(element => {
      if (element.id === action.payload.id) {
        element.completed = !element.completed;
        element.update = new Date().getTime();
      }
      return element;
    });
    // storage data to localStorage
    setStorage('todos', s)

    return s;
  }

  // initial get todo list from localStorage
  let s = getStorage('todos');

  // return the todo list stored at localStorage
  // and if it does not exists, initial it with an empty array 
  return s ? s : [];
}

// toggle 
const isShow = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SHOW:
      return !state;
    default:
      return state;
  }
}

// Keep the value while input
// and once enter key was pressed clear the input box
const inputValue = (state = '', action) => {
  switch (action.type) {
    case INPUT:
      return action.payload.value;
    case ADD_TODO:
      return '';
    default:
      return state;
  }
}

// Initial popup target with null
const popupTarget = (state = null) => state;

// Initial popup target with null
const popValue = (state = null) => state;

// Deal with todos updates
const updateTodos = (todos, target, message) => {
  // get the copy of todos
  let t = todos.slice();
  t.forEach(i => {
    // update message
    if (i.id === target.id) {
      i.message = message;
    }
    return i;
  });
  // store local data
  setStorage('todos', t);
  return t;
}

// Handle actions about popup
const handlePopupAction = (state, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return Object.assign({}, state, {
        popupTarget: find(state.todos, (o) => o.id === action.payload.id),
        popValue: find(state.todos, (o) => o.id === action.payload.id).message,
      });
    case CLOSE_POPUP:
      return Object.assign({}, state, {
        popupTarget: null,
        popValue: null,
      });
    case CLOSE_AND_SAVE_POPUP:
      return Object.assign({}, state, {
        todos: updateTodos(state.todos, state.popupTarget, state.popValue),
        popupTarget: null,
        popValue: null,        
      });
    case POP_VALUE_CHANGED:
      return Object.assign({}, state, {
        popValue: action.payload.message
      });
    default:
      return state;
  }
}

const color = (state = getStorage('color'), action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      // storage color
      setStorage('color', action.payload.color);
      return action.payload.color;
    default:
      return state ? state : 'default';
  }
}

// Create root reducer
const RootReducer = combineReducers({
  time,
  inputValue,
  toggleMenu,
  todos,
  isShow,
  popupTarget,
  popValue,
  color,
});

// Chain the reducers,
export default ReducerChain(
  RootReducer,
  handlePopupAction,
);
