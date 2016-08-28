import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  UIManager,
  CameraRoll,
} from 'react-native';
import { observer } from 'mobx-react/native';

import StyledText from './StyledText.js';

class TextureFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = { marginBottom: 0};
  }

  componentWillUnmount() {
    if (this.props.store.navHidden) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.props.store.toggleNavHidden();
    }
  }

  toggleNavAndButtonVisiblity(callback) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => {
      typeof callback === 'function' && callback();
    });
    this.props.store.toggleNavHidden();
    if (this.state.marginBottom === 0) {
      this.setState({marginBottom: -100});
    } else {
      this.setState({marginBottom: 0});
    }
  }

  takeScreenshot() {
    const takeScreenshotOfActiveWindow = () => {
      UIManager
        .takeSnapshot('window', {format: 'jpeg', quality: 0.8}) // See UIManager.js for options
        .then((uri) => {
          return CameraRoll.saveToCameraRoll(uri, 'photo');
        })
        .then(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.toggleNavAndButtonVisiblity();
        })
        .catch((error) => alert(error));
    }

    this.toggleNavAndButtonVisiblity(takeScreenshotOfActiveWindow);
  }

  render() {
    const { store } = this.props;
    return (
      <View style={styles.viewContainer}>
        <ScrollView style={{ flex: 1, backgroundColor: store.textureColor }}>
          <TouchableWithoutFeedback onPress={this.toggleNavAndButtonVisiblity.bind(this)} >
            <View style={{ flex: 1, backgroundColor: store.textureColor, height: 900 }}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: `https://www.transparenttextures.com/patterns/${store.selectedTextureSlug}.png` }}
                resizeMode={Image.resizeMode.repeat}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <TouchableOpacity onPress={this.takeScreenshot.bind(this)} style={{ marginBottom: this.state.marginBottom }}>
          <View style={[styles.buttonContainer]}>
            <StyledText textColor={store.textColor}>Take Screenshot</StyledText>
            <StyledText textColor={store.textColor} style={{fontSize: 12}}>(will send wallpaper to Camera Roll)</StyledText>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

TextureFull.propTypes = {
  textureName: React.PropTypes.string,
  textureSlug: React.PropTypes.string,
  store: React.PropTypes.object,
};

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  viewContainer: {
    flex: 1
  },
  buttonContainer: {
    padding: 15,
    flex: 1,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(TextureFull);
