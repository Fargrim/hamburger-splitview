import React, {PropTypes} from 'react';

const SidebarItem = ({content}) => (
  <div className="menu-sidebar icon-pane">
    {content.map(
      menuItem => {
        return (
          <span key={menuItem.title} className="menu-item">
            <div className="list-div">
              <img className="menu-item-icon" src={menuItem.image} />
            </div>
            <div className="menu-text">{menuItem.title}</div>
          </span>
        );
      }
    )}
  </div>
);

SidebarItem.propTypes = {
  content: PropTypes.array.isRequired
}

export default SidebarItem;