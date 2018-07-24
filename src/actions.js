// Definition of Actions

export const ADD_TODO = 'ADD_TODO';
export const INPUT = 'INPUT';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TIME_UPDATE = 'TIME_UPDATE';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_SHOW = 'TOGGLE_SHOW';
export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const CLOSE_AND_SAVE_POPUP = 'CLOSE_AND_SAVE_POPUP';
export const POP_VALUE_CHANGED = 'POP_VALUE_CHANGED';
export const CHANGE_COLOR = 'CHANGE_COLOR';


export const timeUpdate = () => ({
  type: TIME_UPDATE
});

export const toggleMenu = () => ({
  type: TOGGLE_MENU
});

export const addTodo = string => ({
  type: ADD_TODO,
  payload: {
    message: string,
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {
    id: id,
  }
});

export const toggleShow = () => ({
  type: TOGGLE_SHOW
});

export const input = val => ({
  type: INPUT,
  payload: {
    value: val,
  }
});

export const openPopup = id => ({
  type: OPEN_POPUP,
  payload: {
    id: id,
  }
});

export const closePopup = () => ({
  type: CLOSE_POPUP
});

export const closeAndSavePopup = () => ({
  type: CLOSE_AND_SAVE_POPUP
});

export const popValueChanged = message => ({
  type: POP_VALUE_CHANGED,
  payload: {
    message: message
  }
});

export const changeColor = color => ({
  type: CHANGE_COLOR,
  payload: {
    color: color
  }
});
