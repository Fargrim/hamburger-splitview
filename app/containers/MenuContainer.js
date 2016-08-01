import React, {Component} from 'react';
import Sidebar from '../components/Sidebar';


class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: ''
    }
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {
    
  }

  componentDidUpdate(prevProps, prevState) {

  }

  // componentWillUnmount() {
  //   this.setState({
  //     open: false
  //   });
  // }

  render() {
    return (
      <Sidebar open={this.state.open} />
    );
  }
}

export default MenuContainer;