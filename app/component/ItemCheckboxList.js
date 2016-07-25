import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Waypoint = require('react-waypoint');
var Style = require('../Style.js');

export class ItemCheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }
  handleListClick(_id, value, status) {
    var updated = this.state.selectedItems;
    if (status) {
      updated[_id] = value;
      this.setState({
        selectedItems: updated
      });
      this.props.onSelect(_id, value);
    }
    else {
      this.handleTagClick(_id);
    }
  }
  handleTagClick(_id) {
    var checkboxElement = eval(`this.refs.${_id}`)
    var value = checkboxElement.props.value;
    checkboxElement.state.status = false;
    var updated = this.state.selectedItems;
    delete updated[_id];
    this.setState({
      selectedItems: updated
    });
    this.props.onRemove(_id, value);
  }
  render() {
    let items = this.props.items;
    let selectedItems = this.state.selectedItems;
    var ListItemsArray = [];
    var TagItemsArray = [];
    Object.keys(items).forEach(function (key) {
      ListItemsArray.push(<ListItem key={key} value={items[key]} _id={key} handleClick={this.handleListClick} status={false} ref={key} />);
    }.bind(this));
    Object.keys(selectedItems).forEach(function (key) {
      TagItemsArray.push(<Tag key={key} value={selectedItems[key]} _id={key} onClick={this.handleTagClick} />);
    }.bind(this));
    
    return (
      <div>
        {TagItemsArray}
        <div style={Style.divScroll}>
          {ListItemsArray}
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status || false,
    };
  }
  handleClick() {
    this.setState({
      status: !this.state.status
    });
    this.props.handleClick(this.props._id, this.props.value, !this.state.status);
  }
  handleCheckboxChange(event) {
    this.setState({
      status: event.target.checked
    });
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this) } style={Style.divListItem}>
        <input type="checkbox" checked={this.state.status} onChange={this.handleCheckboxChange.bind(this) } />
        <label >{this.props.value}</label>
      </div>
    );
  }
}

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span onClick={this.props.onClick.bind(null, this.props._id) } style={Style.divListTag}>
        <span>{this.props.value}</span>
        <span><b>&nbsp; x</b></span>
      </span>
    );
  }
}