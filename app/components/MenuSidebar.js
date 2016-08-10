import React, {Component, PropTypes} from 'react';

class MenuSidebar extends Component {
  render() {
    return (
      <div className="menu-sidebar icon-pane">
        {this.props.content.map(
          menuItem => {
            return (
              <span key={menuItem.title} className="menu-item">
                <div className="list-div">
                  <img className="menu-item-icon" src={menuItem.image} />
                </div>
                <div className="menu-text sliding-pane">{menuItem.title}</div>
              </span>
            );
          }
        )}
      </div>
    );
  }
}

MenuSidebar.propTypes = {
  content: PropTypes.array.isRequired
}

export default MenuSidebar;