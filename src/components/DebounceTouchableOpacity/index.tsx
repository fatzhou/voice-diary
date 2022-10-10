import React, {useCallback} from 'react';
import {TouchableOpacityProps} from 'react-native';
import {debounce, DebounceSettings} from 'lodash';
import TouchableOpacity from '../TouchableOpacity';

export default ({
  onPress = () => {},
  children,
  interval = 500,
  debounceSettings = {
    leading: true,
    trailing: false,
  },
  ...props
}: TouchableOpacityProps & {
  children: React.ReactNode;
  interval?: number;
  debounceSettings?: DebounceSettings;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePress = useCallback(
    debounce(onPress, interval, debounceSettings),
    [onPress, interval, debounceSettings],
  );

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};
