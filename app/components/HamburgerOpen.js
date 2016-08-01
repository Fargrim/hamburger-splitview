import React, {Component} from 'react';
import {Link} from 'react-router';

class HamburgerOpen extends Component {
  render() {
    return (
      <div>
        <Link to='/'>
          <img className='hamburgerOpen' src='app/images/ic_arrow_back_black_24dp_2x.png' alt='Menu'/>
        </Link>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default HamburgerOpen;