import Rx from 'rxjs';
import React from 'react';


const intent = () => {};
const model = () => {};
const view = () => (
  Rx.Observable.of(<section className="main-content">
    I am the Main Content, yay!
  </section>)
);


function MainContent(sources) {


  const vtree$ = view();
  return {
    DOM: vtree$
  }
}

export default MainContent;