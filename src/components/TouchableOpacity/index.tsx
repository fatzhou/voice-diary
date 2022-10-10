import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {
  TouchableOpacityActiveOpacity,
  TouchableOpacityHitSlop,
} from '~/core/const';

const TouchableOpacityComponent = (
  props: TouchableOpacityProps & {
    children: React.ReactNode;
  },
) => {
  const {
    children,
    activeOpacity = TouchableOpacityActiveOpacity,
    hitSlop = TouchableOpacityHitSlop,
    ...rest
  } = props;
  return (
    <TouchableOpacity activeOpacity={activeOpacity} hitSlop={hitSlop} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
export default TouchableOpacityComponent;
