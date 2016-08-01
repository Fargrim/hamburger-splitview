import React, {Component} from 'react';
import {Link} from 'react-router';

class HamburgerClosed extends Component {
  render() {
    return (
      <div>
        <Link to='/menu'>
          <img className='hamburger' src='app/images/ic_menu_black_24dp_2x.png' alt='Menu'/>
        </Link>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default HamburgerClosed;