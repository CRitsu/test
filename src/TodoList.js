// @flow

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';

import {
  timeUpdate,
  input,
  toggleMenu as toggleMenuAction,
  addTodo,
  toggleTodo,
  toggleShow,
  openPopup,
  closePopup,
  closeAndSavePopup,
  popValueChanged,
  changeColor,
} from './actions';

import Signal from './resources/signal.svg';
import Battery from './resources/battery.svg';
import Skin from './resources/skin.svg';
import './todolist.css';

// import themes
import Themes from './themes/index';
import './themes/dark.css';
import './themes/light.css';
import './themes/orange.css';


// The entry key code
const ENTER_KEY = 13;

// Signal and battery symbol
const NativeBar = (props: { time: string }) => (
  <div className="native-bar" >
    <img className="bar-items signal" src={Signal} alt="signal" />
    <div className="bar-items time" >
      {props.time}
    </div>
    <img className="bar-items battery" src={Battery} alt="battery" />
  </div>
);

// The menu icon and title
const Header = (props: {
  toggleMenu: boolean,
  color: string,
  handleToggleMenu: () => void,
  handleColorChange: string => void,
}) => (
    <div className="header" >
      <div className={`menu-wrapper ${props.toggleMenu ? 'clicked' : ''}`} >
        <svg version="1.1" className="menu" onClick={props.handleToggleMenu} >
          <g>
            <rect x="0" y="0" className="menu-graph" width="25" height="2" />
            <rect x="0" y="8" className="menu-graph" width="25" height="2" />
            <rect x="0" y="16" className="menu-graph" width="25" height="2" />
          </g>
        </svg>
      </div>
      <div className="title" >Todo List</div>
      <div className="menu-content" style={{
        height: props.toggleMenu ? '70px' : '0px'
      }} >
        <div className="panel" >
          <img className="skin" src={Skin} alt="Skin" />
          <div className="skin-list" >
            {Themes.map(i => (
              <div key={i} className={`skin-wrapper ${i} ${props.color === i ? 'active' : ''}`} >
                <div className="skin-item" onClick={() => props.handleColorChange(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


// Input box for add todo
const InputBox = (props: {
  onEnter: string => void,
  inputValue: string,
  handleChange: string => void,
}) => (
  <div className="input-box" >
    <input id="input" className="input-area" placeholder="添加新任务......"
      onKeyDown={e => { if (e.which === ENTER_KEY) props.onEnter(e.currentTarget.value) }}
      value={props.inputValue}
      onChange={e => props.handleChange(e.currentTarget.value)}
    />
    <label className="input-label" htmlFor="input" >+</label>
  </div>
);

// The type definetion of todo items
type todoItems = {
  id: number,
  message: string,
  completed: boolean,
  update: number,
}

// The UI of todo list
const ListShow = (props: {
  todos: Array<todoItems>,
  active?: boolean,
  handleToggleTodo: number => void,
  handleOpenPopup: number => void,
}) => (
  <div className={props.active ? 'active-list' : 'completed-list'} >
    {props.todos.map(item => (
      <div className="items" key={item.id} >
        <div className="check-box-wrapper">
          <input className="check-box" type="checkbox"
            onChange={() => props.handleToggleTodo(item.id)}
            checked={item.completed}
          />
        </div>
        <div className="content" onClick={() => props.handleOpenPopup(item.id)} >
          {item.message}
        </div>
      </div>
    ))}
  </div>
);

// For toggle the completed todos display
const ToggleButton = (props: {
  handleToggleShow: () => void,
  isShow: boolean,
}) => (
    <div className="toggle-show" onClick={props.handleToggleShow} >
      {props.isShow ? '已完成' : '显示已完成'}
    </div>
  );

// Control the popup
const Popup = (props: {
  onClose: () => void,
  onSave: string => void,
  keepPopupValue: string => void,
  popValue: string,
}) => (
  <div className="mask" >
    <div className="pop-up" >
      <div className="close" onClick={props.onClose} >×</div>
      <textarea className="modify" value={props.popValue}
        onChange={e => props.keepPopupValue(e.currentTarget.value)} />
      <button className="save" onClick={props.onSave} >保存</button>
    </div>
  </div>
);

// The props of main UI component
type Props = {
  time: string,
  inputValue: string,
  toggleMenu: boolean,
  isShow: boolean,
  active: Array<todoItems>,
  completed: Array<todoItems>,
  popValue: string,
  color: string,
  timeUpdate: () => void,
  handleChange: string => void,
  handleSubmit: string => void,
  handleToggleMenu: () => void,
  handleToggleTodo: number => void,
  handleToggleShow: () => void,
  handleOpenPopup: number => void,
  handleClosePopup: () => void,
  handleSavePopup: string => void,
  keepPopupValue: string => void,
  handlePopValueChange: string => void,
  handleColorChange: string => void,
}

// Main componoent
class TodoList extends React.Component<Props> {
  componentDidMount() {
    this.props.timeUpdate();
  }

  render() {
    // get the short name of props
    const {
      time,
      inputValue,
      toggleMenu,
      isShow,
      active,
      completed,
      popValue,
      color,
      handleToggleMenu,
      handleChange,
      handleSubmit,
      handleToggleTodo,
      handleToggleShow,
      handleOpenPopup,
      handleClosePopup,
      handleSavePopup,
      keepPopupValue,
      handleColorChange,
    } = this.props;

    return (
      <div className={`todo-list ${color}`}>
        <NativeBar time={time} />

        <Header handleToggleMenu={handleToggleMenu} 
          toggleMenu={toggleMenu} color={color} 
          handleColorChange={handleColorChange} />

        <InputBox onEnter={handleSubmit} 
          inputValue={inputValue} handleChange={handleChange} />
        
        <div className="list" >
          <ListShow todos={active} active
            handleToggleTodo={handleToggleTodo} handleOpenPopup={handleOpenPopup} />
          <ToggleButton isShow={isShow} 
            handleToggleShow={handleToggleShow} />
          <ListShow todos={completed}
            handleToggleTodo={handleToggleTodo} handleOpenPopup={handleOpenPopup} />
        </div>

        {popValue !== null
          ? <Popup popValue={popValue} 
              onClose={handleClosePopup} 
              onSave={handleSavePopup} 
              keepPopupValue={keepPopupValue} />
          : null
        }
        
      </div>
    )
  }
}

// create main store
const store = createStore(reducers);

// State to props mapping
const mapStateToProps = state => ({
  time: state.time,
  inputValue: state.inputValue,
  toggleMenu: state.toggleMenu,
  isShow: state.isShow,
  active: state.todos.filter(i => !i.completed),
  completed: state.isShow ? state.todos.filter(i => i.completed) : [],
  popValue: state.popValue,
  color: state.color,
});

// dispatch function map to props
const mapDispatchToProps = dispatch => ({
  timeUpdate: () => { setInterval(() => dispatch(timeUpdate()), 60000) },
  handleChange: val => dispatch(input(val)),
  handleSubmit: string => dispatch(addTodo(string)),
  handleToggleMenu: () => dispatch(toggleMenuAction()),
  handleToggleTodo: id => dispatch(toggleTodo(id)),
  handleToggleShow: () => dispatch(toggleShow()),
  handleOpenPopup: id => dispatch(openPopup(id)),
  handleClosePopup: () => dispatch(closePopup()),
  handleSavePopup: () => dispatch(closeAndSavePopup()),
  keepPopupValue: message => dispatch(popValueChanged(message)),
  handleColorChange: color => dispatch(changeColor(color)),
});

// create the container component
const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

// Use Provider to pass store context
const wrapper = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);


export default wrapper;
