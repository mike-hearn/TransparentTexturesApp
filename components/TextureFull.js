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
  Modal,
} from 'react-native';
import { observer } from 'mobx-react/native';

import StyledText from './StyledText.js';

class TextureFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      marginBottom: 0
    };
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

  toggleModal() {
    console.log('something happened?');
    if (this.state.modalVisible) {
      this.setState({ modalVisible: false });
    } else {
      this.setState({ modalVisible: true });
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
          this.toggleModal();
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
        <Modal
          animationType={"slide"}
          visible={this.state.modalVisible}
        >
          <View style={[{ backgroundColor: this.props.store.textureColor }, styles.modal]}>
            <StyledText style={styles.modalHeaderText} textColor={store.textColor}>Wallpaper Created</StyledText>
            <StyledText style={styles.modalSubText} numberOfLines={10} textColor={store.textColor}>A wallpaper has been placed in your Photos. You can make this your phone's wallpaper by going to 'Settings' → 'Wallpaper'.</StyledText>
            <TouchableOpacity
              onPress={() => { this.setState({ modalVisible: false }); }}
            >
              <View style={styles.modalButton}>
                <StyledText style={styles.modalButtonText} textColor={store.textColor}>Back to App</StyledText>
              </View>
            </TouchableOpacity>

          </View>
        </Modal>
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
            <StyledText style={{fontSize: 18, fontWeight: '600'}} textColor={store.textColor}>Create Wallpaper</StyledText>
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
    maxHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalHeaderText: {
    fontSize: 22
  },
  modalSubText: {
    fontSize: 15,
    margin: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default observer(TextureFull);
