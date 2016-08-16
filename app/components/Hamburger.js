import React from 'react';
import Rx from 'rxjs';
import SidebarItem from './SidebarItem';


const intent = (DOMSource) => DOMSource.select('.burger-row *').events('click');
const model = (toggle$, props$) => {
  const initialValue$ = props$.map(props => props.open).first();
  const content$ = props$.map(props => props.content);
  const shouldToggle$ = initialValue$
    .merge(toggle$.scan(toggle => {
      return !toggle;
    }, false));

  return Rx.Observable.combineLatest(shouldToggle$, content$, (toggle, content) => {
    return {
      open: toggle,
      content: content
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
      </div>
      <SidebarItem content={content}/>
    </div>
  );}
);

function Hamburger(sources) {
  const toggle$ = intent(sources.DOM);
  const state$ = model(toggle$, sources.props);
  const vtree$ = view(state$);

  return {
    DOM: vtree$
  };
}


export default Hamburger;