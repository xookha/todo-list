import React, { Component } from 'react';
import './App.css';
import { MdCancel, MdDone } from 'react-icons/lib/md';

var createReactClass = require('create-react-class');

var Task = createReactClass ({
  getInitialState: function () {
    this.state = {
      checked: false,
    };
    return{edit: false}
  },
  edit: function () {
    this.setState ({edit: true});
  },
  remove: function () {
    this.props.deleteItem(this.props.index);
  },
  save: function () {
    var value = this.refs.newTxt.value;
    this.props.updateItem(value, this.props.index);
    this.setState ({edit: false})
  },
  handleCheck: function () {
    this.setState({checked: !this.state.checked});
  },
  rendNorm: function () {
    var classCheckBox;
    if (this.state.checked) {
      classCheckBox = 'done';
    } else {
      classCheckBox = '';
    }
    return (
      <p className="box">
        <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />
        <span className={classCheckBox} onClick={this.edit}>{this.props.children} </span>
        <MdCancel onClick={this.remove} className="warning" />
      </p>
    );
  },
  rendEdit: function () {
    return (
      <p className="box">
        <input type="text" ref="newTxt" defaultValue={this.props.children} autoFocus="true" />
        <MdDone onClick={this.save} className="success" />
      </p>
    );
  },
  render: function() {
    if (this.state.edit) {
      return this.rendEdit ();
    } else {
      return this.rendNorm ();
    }
  }
});

var Field = createReactClass ({
  getInitialState: function() {
    return {
        tasks: []
    }
  },
  addItem: function (text) {
    var arr = this.state.tasks;
    arr.push(text);
    this.setState({tasks: arr});
  },
  deleteItem: function (i) {
    var arr = this.state.tasks;
    arr.splice(i, 1);
    this.setState ({tasks: arr});
  },
  updateItem: function (text, i) {
    var arr = this.state.tasks;
    arr[i] = text;
    this.setState ({tasks: arr});
  },
  eachTask: function (item, i) {
    return (
      <Task key={i} index={i} updateItem={this.updateItem} deleteItem={this.deleteItem}>
        {item}
      </Task>
    );
  },
  render: function () {
    return (
      <div className="field">
        <button onClick={this.addItem.bind(null, 'New Item')} className="btn">Add new item</button>
        {this.state.tasks.map (this.eachTask)}
      </div>
    );
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TODO list</h1>
        </header>
        <div className="App-intro">
          <Field/>
        </div>
      </div>
    );
  }
}

export default App;
