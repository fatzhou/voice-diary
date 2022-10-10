import * as React from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {colors} from '../../core/theme';
const {width, height} = Dimensions.get('window');

interface LoadingComponentProps {
  show: boolean;
}
export default (props: LoadingComponentProps) => {
  const {show} = props;
  return show ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.textColor} />
    </View>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
