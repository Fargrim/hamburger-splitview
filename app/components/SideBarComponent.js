import Rx from 'rxjs';
import React from 'react';

const intent = () => {};
// const model = (props) => {
//   console.log('SideBarComponent:', props);
//   return props.;
// };
const view = (state$) => {
  return state$.map(state => (
    <div className="menu-sidebar icon-pane">
    {state.map(
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
  </div>))
};

function SideBarComponent(sources) {

  // const state$ = model(sources.props);
  const vtree$ = view(sources.props.map(p => p.content));

  return {
    DOM: vtree$
  }
}


export default SideBarComponent