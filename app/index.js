import React from 'react';
import ReactDOM from 'react-dom';
import Hamburger from './components/Hamburger';
import App from './components/App';
import Rx from 'rxjs';

function makeDOMSource(...selectors) {
  return {
    select: (nextSelector) => makeDOMSource(...selectors, nextSelector),
    events: (event) => {
      return Rx.Observable
      .fromEvent(document, event)
      .filter((ev) => {
        console.log('Event:', ev);
        return ev.target.matches(selectors.join(' '))
      })}
  }
}

function selectorMatch(target, selectorsArr) {
  return target && (target.matches(selectorsArr.join(' ')) 
    ? true 
    : selectorMatch(target.parentElement, selectorsArr));
}

function makeDOMDriver(selector) {
  // DOMSource ... clicks, keyboard strokes, etc.
  return component$ => {
    const rootEle = document.querySelector(selector);
    console.log('makeDOMDriver:', selector, rootEle);
    component$.subscribe((component) => {
      ReactDOM.render(
        component,
        rootEle
      );
    });
    return makeDOMSource(selector);
  }
}

const main = App;
const hamburgerContent = {
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
};

function oldMain(sources) {
  /*const hamburgerProps$ = sources.DOM.select('.add-button').events('click').map(e =>
    ({
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
  }))
  .startWith({
    content: [
      {
        image: 'app/images/ic_home_black_48dp_2x.png',
        title: 'Home'
      },
      {
        image: 'app/images/ic_star_black_48dp_2x.png',
        title: 'Favorites'
      }
    ],
    open: false
  });*/
  const hamburgerProps$ = Rx.Observable.of({
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

  const burgerSinks = Hamburger({DOM: sources.DOM, props: hamburgerProps$});

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
  console.log('after main');
  Object.keys(drivers).forEach(key => {
    drivers[key](sinks[key]);

  });
}

const drivers = {
  DOM: makeDOMDriver('.app')
}

run(main, drivers)