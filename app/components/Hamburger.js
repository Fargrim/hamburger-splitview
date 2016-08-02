import React, {Component} from 'react';
import MenuSidebar from './MenuSidebar';

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
  }
  render() {
    console.log('Hamburger open?', this.state.open);
    return (
      <div>
        <button onClick={() => this.setState({open: !this.state.open})}><img src="app/images/ic_menu_black_24dp_2x.png" /></button>
        <MenuSidebar menuOpen={this.state.open} content={this.state.content}/>
      </div>
    );
  }
}

export default Hamburger;