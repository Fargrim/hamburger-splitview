import React, {Component} from 'react';
import MenuSidebar from './MenuSidebar';
import Rx from 'rxjs';


const intent = (click$, props) => {
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
      <MenuSidebar menuOpen={state.open} content={state.content}/>
    </div>
  )});
  return vtree$;
}


const Hamburger = (props) => {
  // const proxyClick$ = new Rx.Subject();
  console.log(props);
  const click$ = intent(props);
  const state$ = model(click$);
  const vtree$ = view(state$);
  // Ditch the MenuSideBar for now.  Render it explicitly here instead.
  return (
    <div className="hamburger-menu">
      <img src="app/images/ic_menu_black_24dp_2x.png" />
    </div>
  );
}
// class Hamburger extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       content: [
//         {
//           image: 'app/images/ic_home_black_18dp_2x.png',
//           title: 'Home'
//         },
//         {
//           image: 'app/images/ic_star_rate_black_18dp_2x.png',
//           title: 'Favorites'
//         },
//         {
//           image: 'app/images/ic_settings_black_18dp_2x.png',
//           title: 'Settings'
//         },
//       ]
//     };
//   }
//   render() {
//     const proxyClick$ = new Rx.Subject();
//     const click$ = intent(proxyClick$);
//     const state$ = model(click$);
//     const vtree$ = view(state$);
//     // Ditch the MenuSideBar for now.  Render it explicitly here instead.
//     return vtree$;
//   }
// }

export default Hamburger;