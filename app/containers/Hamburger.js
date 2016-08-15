import React from 'react';
import Rx from 'rxjs';
import HamburgerComponent from '../components/HamburgerComponent';


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
// const view = (state$) => state$.map(({open, content}) => {
//   return (
//     <div className="root-content">
//       <HamburgerComponent open={open} content={content}/>
//       <button className="add-button">Test</button>
//     </div>
//   );}
// );

const view = (state$) => state$.map(({open, content}) => {
  return (
    <HamburgerComponent open={open} content={content}/>
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