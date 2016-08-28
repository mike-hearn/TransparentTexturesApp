import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  LayoutAnimation
} from 'react-native';
import { observer } from 'mobx-react/native';

import routeMap from './NavigationRouteMap.js';

class NavigationBar extends Component {

  updateProgress(...args) {
    this.refs.navbar.updateProgress(...args);
  }

  hiddenStatus(isHidden) {
    const hiddenStyle = {};
    if (isHidden) {
      hiddenStyle.marginTop = -100;
    } else {
      hiddenStyle.marginTop = 0;
    }
    return hiddenStyle;
  }


  render() {
    const { store } = this.props;
    return (
      // <View style={{ height: 100}}>
      <Navigator.NavigationBar
        {...this.props}
        ref="navbar"
        style={[
          styles.navBar,
          this.hiddenStatus(store.navHidden),
          { backgroundColor: this.props.store.textureColor }]}
        routeMapper={routeMap({ textColor: store.textColor, statusBarHidden: store.navHidden })}
      />
    // </View>
    );
  }
}

NavigationBar.propTypes = {
  store: React.PropTypes.any,
};


const styles = StyleSheet.create({
  navBar: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
});

export default observer(NavigationBar);
