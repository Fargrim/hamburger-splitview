import React, {Component, PropTypes} from 'react';
import MenuOpen from '../components/MenuOpen';
import MenuClosed from '../components/MenuClosed';

class Sidebar extends Component {
  render() {
    return this.props.open ? 
      ( <MenuOpen text='OPEN' image={this.props.image}/>) : 
      ( <MenuClosed text='CLOSED' image={this.props.image} title={this.props.title}/> );
  }
}

Sidebar.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Sidebar;