import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { observer } from 'mobx-react/native';

class StyledText extends React.Component {
  render() {
    const {style, ...otherProps} = this.props;
    return (
      <Text
        style={[{ color: this.props.textColor }, styles.textStyle, style]}
        ellipsizeMode="tail"
        numberOfLines={1}
        {...otherProps}
      >
        {this.props.children}
      </Text>
    );
  }
}

StyledText.propTypes = {
  textColor: React.PropTypes.string,
};


const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Avenir Next',
  },
});


export default observer(StyledText);
