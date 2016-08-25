import React from 'react';
import { Navigator } from 'react-native';

class NavigationBar extends Navigator.NavigationBar {
  render() {
    if (this.props.store.navHidden) {
      return null;
    } else {
      return <Navigator.NavigationBar {...this.props} />;
    }
  }
}

NavigationBar.propTypes = {
  store: React.PropTypes.object,
};

export default NavigationBar;
