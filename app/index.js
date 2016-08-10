import React from 'react';
import ReactDOM from 'react-dom';
import Hamburger from './containers/Hamburger';
import Rx from 'rxjs';
import isolate from './utils/isolate';

function makeDOMSource(...selectors) {
  return {
    select: (nextSelector) => {
      return makeDOMSource(...selectors, nextSelector);
    },
    events: (event) => {
      return Rx.Observable.fromEvent(document, event).filter((ev) => {
        console.log(ev.target.matches(selectors.join(' ')), selectors.join(' '), ev.target);
        return ev.target.matches(selectors.join(' '));
      });
    }
  };
}

function makeDOMDriver(selector) {
  // DOMSource ... clicks, keyboard strokes, etc.
  return component$ => {
    console.log('makeDOMDriver');
    const rootEle = document.querySelector(selector);
    component$.subscribe((component) => {
      console.log('in subscribe');
      ReactDOM.render(
        component,
        rootEle
      );
    });
    
    return makeDOMSource(selector);
  }
}


function main(sources) {
  const hamburgerProps$ = Rx.Observable.of({
    content: [
      {
        image: 'app/images/ic_home_black_48dp_1x.png',
        title: 'Home'
      },
      {
        image: 'app/images/ic_star_black_48dp_1x.png',
        title: 'Favorites'
      },
      {
        image: 'app/images/ic_settings_black_48dp_1x.png',
        title: 'Settings'
      },
    ],
    open: false
  })


  const burgerSinks = Hamburger({DOM: sources.DOM, props: hamburgerProps$});
  
  console.log(burgerSinks);
  const sinks = {
    DOM: burgerSinks.DOM
  }; 
  return sinks;
}

function run(mainFn, drivers) {
  const proxySources = {};
  Object.keys(drivers).forEach(key => {
    proxySources[key] = drivers[key](new Rx.Subject());
  });
  const sinks = mainFn(proxySources);
  Object.keys(drivers).forEach(key => {
    drivers[key](sinks[key]);
  });
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)