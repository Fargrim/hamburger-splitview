import React from 'react';
import Rx from 'rxjs';
import HamburgerComponent from '../components/HamburgerComponent';


const intent = (DOMSource) => {
  return DOMSource.select('.hamburger-icon').events('click');
}
const model = (toggle$, props$) => {
  const initialValue$ = props$.map(props => props.open).first();
  const content$ = props$.map(props => props.content);
  const shouldToggle$ = initialValue$
    .merge(toggle$.scan(toggle => {
      console.log(toggle);
      return !toggle;
    }, false));

  return Rx.Observable.combineLatest(shouldToggle$, content$, (toggle, content) => {
    console.log(toggle);
    return {
      open: toggle,
      content: content
    };
  });
}
const view = (state$) => {
  const vtree$ = state$.map(({open, content}) => {
    return (
      <HamburgerComponent open={open} content={content}/>
    );
  });
  return vtree$;
}


function Hamburger(sources) {
  console.log('test');
  const toggle$ = intent(sources.DOM);
  console.log(toggle$);
  const state$ = model(toggle$, sources.props);
  console.log(state$);
  const vtree$ = view(state$);
  console.log(vtree$);

  return {
    DOM: vtree$
  };
}


export default Hamburger;