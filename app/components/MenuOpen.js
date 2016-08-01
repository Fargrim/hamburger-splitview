import React, {Component, PropTypes} from 'react';

/**
 * 
 * 
 * @class MenuOpen
 * @extends {Component}
 * 
 * @todo Update this to a container, create corresponding component to render content
 * This container should hold the icons and data for each MenuItem inside the menu.
 */

class MenuOpen extends Component {
  render() {
    return (
      <div>
        {this.props}
      </div>
    );
  }
}

MenuOpen.propTypes = {
};

export default MenuOpen;