import React, {Component, PropTypes} from 'react';

class MenuSidebar extends Component {
  render() {
    return (
      <div className="menu-sidebar">
        <ul>
          {this.props.content.map(
            menuItem => {
              return (
                <li key={menuItem.title}>
                  <button> 
                    <img className="menu-item-icon" src={menuItem.image} />
                  </button>
                  <h3 className="menu-item-text">{menuItem.title}</h3>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}

MenuSidebar.propTypes = {
  content: PropTypes.array.isRequired
}

export default MenuSidebar;