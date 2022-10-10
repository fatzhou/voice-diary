import React, {forwardRef} from 'react';
import {
  Image,
  ImageProps,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    padding: 0,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

interface Props {
  icon: ImageProps;
  onPress?: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
}

const Button = forwardRef<TouchableOpacity, Props>(
  ({icon, onPress, onLayout}, ref) => (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={styles.button}
      onLayout={onLayout}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  ),
);

export default Button;
