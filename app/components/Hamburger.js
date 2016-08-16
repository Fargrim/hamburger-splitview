import React from 'react';
import Rx from 'rxjs';
import SidebarItem from './SidebarItem';
import SideBarComponent from './SideBarComponent';


const intent = (DOMSource) => DOMSource.select('.burger-row *').events('click');
const model = (toggle$, props$) => {
  const initialValue$ = props$.map(props => props.open).first();
  const shouldToggle$ = initialValue$
    .merge(toggle$.scan(toggle => {
      return !toggle;
    }, false));

  return shouldToggle$.map(toggle => {
    return {
      open: toggle
    };
  });
}

const view = (state$) => state$.map(({open, content}) => {
  return (
    <div className={`hamburger-menu ${open ? 'menu-open' : 'menu-closed'}`}>
      <div className="burger-row">
        <span className="menu-item">
          <div className="list-div">
            <img className="hamburger-icon" src="app/images/ic_menu_black_48dp_2x.png"  />
          </div>
          <div className="menu-text">Menu</div>
        </span>
        {content}
      </div>
    </div>
  );}
);

function Hamburger(sources) {
  const toggle$ = intent(sources.DOM);
  const state$ = model(toggle$, sources.props);
  const sideBarComponentSinks = SideBarComponent({DOM:sources.DOM, props: sources.props});

  const vtree$ = view(Rx.Observable.combineLatest(state$, sideBarComponentSinks.DOM,
    function(state, sideBarComponentVtree) {
      return {
        open: state.open,
        content: sideBarComponentVtree
      }
    }));

  return {
    DOM: vtree$
  };
}


export default Hamburger;