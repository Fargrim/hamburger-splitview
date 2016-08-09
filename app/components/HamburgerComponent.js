import React, {PropTypes} from 'react';
import MenuSidebar from './MenuSidebar';

const HamburgerComponent = ({open, content}) => {
  return (
    <div className={`hamburger-menu ${open ? 'menu-open' : 'menu-closed'}`}>
        <img className="hamburger-icon" src="app/images/ic_menu_black_24dp_2x.png"  />
      <MenuSidebar content={content}/>
    </div>
  );
};

HamburgerComponent.propTypes = {
  content: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired
};

export default HamburgerComponent;