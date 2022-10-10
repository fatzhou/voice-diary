import React from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../core/theme';

interface Props {
  children?:
    | JSX.Element
    | JSX.Element[]
    | undefined
    | React.ReactNode
    | JSX.Element;
  style?: ViewStyle;
}
export default (props: Props) => {
  const {children, style} = props;
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
});
