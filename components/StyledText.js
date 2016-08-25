import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { observer } from 'mobx-react/native';

class StyledText extends React.Component {
  render() {
    return (
      <Text
        style={[{ color: this.props.store.textColor }, styles.textStyle, this.props.style]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {this.props.children}
      </Text>
    );
  }
}

StyledText.propTypes = {
  store: React.PropTypes.object,
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Avenir Next',
  },
});


export default observer(StyledText);
