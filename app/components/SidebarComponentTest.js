import Rx from 'rxjs';
import React from 'react';

const intent = () => {};
const model = (props) => {
  return props.map(p => p.content);
};
const view = (state$) => {
  console.log(state$);
  return state$.map(state => (
    <div className="menu-sidebar icon-pane">
      <span key={state.title} className="menu-item">
        <div className="list-div">
          <img className="menu-item-icon" src={state.image} />
        </div>
        <div className="menu-text">{state.title}</div>
      </span>
    </div>
  ));
};

function SidebarComponentTest(sources) {
  // sources.props = Observable.of({image: ..., title: ...})
  // const state$ = model(sources.props);
  const vtree$ = view(sources.props);
  return {
    DOM: vtree$
  }
}


export default SidebarComponentTest;

