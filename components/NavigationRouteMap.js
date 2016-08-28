import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import StyledText from './StyledText.js';

const routeMap = ({textColor = 'white', statusBarHidden = false}) => ({
  LeftButton: (route, navigator, index, navState) => {
    const previousRoute = navState.routeStack[index - 1];
    if (index === 0) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
      >
        <StyledText
          textColor={textColor}
          style={[styles.navText, styles.navBarButtonText]}
        >
          {previousRoute.title}
        </StyledText>
      </TouchableOpacity>
    );
  },
  RightButton: (route, navigator) => {
    if (route.id !== 'changeColors') {
      return (
        <TouchableOpacity
          onPress={() => navigator.push({ id: 'changeColors', title: 'Colors' })}
        >
          <StyledText
            textColor={textColor}
            style={[styles.navText, styles.navBarButtonText]}
          >
            Colors
          </StyledText>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  },
  Title: (route) => (
    <View>
      <StatusBar
        barStyle={textColor === 'white' ? 'light-content' : 'default'}
        hidden={statusBarHidden}
        animated
      />
      <StyledText
        textColor={textColor}
        style={[styles.navText, { fontSize: 16 }]}
      >
      {route.displayTitle ? route.displayTitle : route.title}
      </StyledText>
    </View>
  )
});

const styles = StyleSheet.create({
  navBar: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  navBarButtonText: {
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    padding: 1,
  },
  navText: {
    marginTop: 6
  }
});

export default routeMap;
