import React from 'react';
import Rx from 'rxjs';
import SidebarComponent from './SidebarComponent';
import SidebarComponentTest from './SidebarComponentTest';


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

const view = (state$) => state$.map(({open, sideItems}) => {
  console.log('Hamburger view:', sideItems);
  return (
    <div className={`hamburger-menu ${open ? 'menu-open' : 'menu-closed'}`}>
      <div className="burger-row">
        <span className="menu-item">
          <div className="list-div">
            <img className="hamburger-icon" src="app/images/ic_menu_black_48dp_2x.png"  />
          </div>
          <div className="menu-text">Menu</div>
        </span>
        {sideItems}
      </div>
    </div>
  );}
);

function Hamburger(sources) {

  const toggle$ = intent(sources.DOM);
  const state$ = model(toggle$, sources.props);

  const sidebarVtreesArray$ = sources.props.pluck('content').map(content => { // observable map
    return content.map(item => { //array map
        const itemProps$ = Rx.Observable.of(item);
        const itemSinks = SidebarComponentTest({DOM: sources.DOM, props: itemProps$});
        return itemSinks.DOM;
    });
  });

  const change$ = Rx.Observable.combineLatest(
      sidebarVtreesArray$, 
      state$, 
      (side, state) => {
      return {
        open: state.open,
        sideItems: Rx.Observable.combineLatest(...side, (...args) => args)
      }
    }
  );




  // Observable of:
  // [sidebar vtree$, sidebar vtree$, ...]
  // [sidebar vtree$, sidebar vtree$, ...]
  // [sidebar vtree$, sidebar vtree$, ...]
  // [sidebar vtree$, sidebar vtree$, ...]
  // [sidebar vtree$, sidebar vtree$, ...]

  // const sidebarComponentSinks = SidebarComponent({DOM:sources.DOM, props: sources.props});

  const vtree$ = view(change$);  // I need to combineLatest change$ with state$

  return {
    DOM: vtree$
  };
}


export default Hamburger;