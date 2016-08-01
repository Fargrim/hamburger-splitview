import React, {Component, PropTypes} from 'react';
import MenuContainer from '../containers/MenuContainer';

/**
 * 
 * 
 * @class MenuClosed
 * @extends {Component}
 * 
 * @todo Either render nothing here or render a smaller version of the content in
 * MenuItems.
 */

class MenuClosed extends Component {
  render() {
    return (
      <div>
        <MenuContainer />
      </div>
    );
  }
}

MenuClosed.propTypes = {
  
};

export default MenuClosed;