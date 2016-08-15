import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';

const HamburgerComponent = ({open, content}) => {
  return (
    <div className={`hamburger-menu ${open ? 'menu-open' : 'menu-closed'}`}>
      <div className="burger-row">
        <span className="menu-item">
          <div className="list-div">
            <img className="hamburger-icon" src="app/images/ic_menu_black_48dp_2x.png"  />
          </div>
          <div className="menu-text">Menu</div>
        </span>
      </div>
      <SidebarItem content={content}/>
    </div>
  );
};

HamburgerComponent.propTypes = {
  content: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired
};

export default HamburgerComponent;