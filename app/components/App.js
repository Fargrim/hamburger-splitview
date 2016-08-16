import React from 'react';


const intent = () => {};
const model = () => {};
const view = () => {}; 


function App(sources) {
  const toggle$ = intent(sources.DOM);
  const state$ = model(toggle$, sources.props);
  const vtree$ = view(state$);

  return {
    DOM: vtree$
  };
}


export default App;