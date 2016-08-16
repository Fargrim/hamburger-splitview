import React from 'react';
import Rx from 'rxjs';
import Hamburger from './Hamburger';
import MainContent from './MainContent';
import RightBar from './RightBar';


// const intent = (DOMSource) => DOMSource.events('click');
// const model = (intent$) => intent$.map(() => 'A click happened');
// const view = (state$) => {
//   return state$.map(s => (
//     <div className="main">
//       {s}
//     </div>
//   ));
// };

const view = (state$) => {
  return state$.map(s => (
    <div className="main">
      {s.ham}
      {s.main}
    </div>
  ));
};


function App(sources) {
  const hamProps$ = Rx.Observable.of({
    content: [
      {
        image: 'app/images/ic_search_black_48dp_2x.png',
        title: (<input type="text" placeholder="Search"></input>)
      },
      {
        image: 'app/images/ic_home_black_48dp_2x.png',
        title: 'Home'
      },
      {
        image: 'app/images/ic_star_black_48dp_2x.png',
        title: 'Favorites'
      },
      {
        image: 'app/images/ic_settings_black_48dp_2x.png',
        title: 'Settings'
      }
    ],
    open: false
  });


  // get the vtrees of our Main App's sub components.
  const hamSinks = Hamburger({DOM: sources.DOM, props: hamProps$});
  const mainContentSinks = MainContent(sources.DOM);
  // const RightBarSinks = RightBar(sources.DOM);

  // call view on all of the above subcomponents
  // const vtree$ = view(hamSinks.DOM);
  const vtree$ = view(Rx.Observable.combineLatest(
    hamSinks.DOM,
    mainContentSinks.DOM,
    function (hamVtree, mainContentVtree) {
      return {
        ham: hamVtree,
        main: mainContentVtree
      };
    }
  ));

  return {
    DOM: vtree$
  };
}


export default App;