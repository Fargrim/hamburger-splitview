import React, {Component, PropTypes} from 'react';

class MenuSidebar extends Component {
  render() {
    return (
      <div className="menu-sidebar">
        <ul className={this.props.menuOpen ? 'menu-open' : 'menu-closed'}>
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
  menuOpen: PropTypes.bool.isRequired,
  content: PropTypes.array.isRequired
}

export default MenuSidebar;