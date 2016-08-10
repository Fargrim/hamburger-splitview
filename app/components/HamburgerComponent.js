import React, {PropTypes} from 'react';
import MenuSidebar from './MenuSidebar';

const HamburgerComponent = ({open, content}) => {
  return (
    <div className={`hamburger-menu ${open ? 'menu-open' : 'menu-closed'}`}>
      <span className="menu-item root-item">
        <div className="list-div">
          <img className="hamburger-icon" src="app/images/ic_menu_black_24dp_2x.png"  />
        </div>
        <div className="menu-text sliding-pane">Menu</div>
      </span>
      <MenuSidebar content={content}/>
    </div>
  );
};

HamburgerComponent.propTypes = {
  content: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired
};

export default HamburgerComponent;