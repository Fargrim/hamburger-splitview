import React from 'react';
import ReactDOM from 'react-dom';
import Hamburger from './components/Hamburger';
import Rx from 'rxjs';

const menu = {
  content: [
    {
      image: 'app/images/ic_home_black_18dp_2x.png',
      title: 'Home'
    },
    {
      image: 'app/images/ic_star_rate_black_18dp_2x.png',
      title: 'Favorites'
    },
    {
      image: 'app/images/ic_settings_black_18dp_2x.png',
      title: 'Settings'
    },
  ]
};

const intent = () => {
  return Rx.Observable.fromEvent('.hamburger-menu', 'click');
}
const model = (click$, props) => {
  return click$.map(() => ({
    content: props.content
  }));
}
const view = (state$) => {
  const vtree$ = state$.map(state => {
    return (
    <div className="hamburger-menu">
      <img src="app/images/ic_menu_black_24dp_2x.png" />
      {state.content};
    </div>
  )});
  return vtree$;
}


const Main = (props) => {
  // const proxyClick$ = new Rx.Subject();
  console.log(props);
  const click$ = intent();
  const state$ = model(click$);
  const vtree$ = view(state$);
  vtree$.map(vtree => console.log(vtree));
  // Ditch the MenuSideBar for now.  Render it explicitly here instead.
  return (
    <div className="hamburger-menu">
      <img src="app/images/ic_menu_black_24dp_2x.png" />
    </div>
  );
}

ReactDOM.render(
  Main(menu),
  document.getElementById('app')
);