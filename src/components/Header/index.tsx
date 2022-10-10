import React from 'react';
// import {FunctionComponent} from 'react';
import {StyleSheet, View, Image, Text, NativeModules} from 'react-native';
import {TouchableOpacityActiveOpacity} from '~/core/const';
import DebounceTouchableOpacity from '../DebounceTouchableOpacity';
import images from '../../core/images';
import {colors} from '../../core/theme';

export interface HeaderComponentProps {
  title: string;
  goBack?: () => void;
  leftComponent?: any;
  rightComponent?: any;
}

export default React.memo((props: HeaderComponentProps) => {
  const {
    title,
    goBack,
    leftComponent: LeftComponent = () => {
      return (
        <View>
          <Image style={styles.goBackIcon} source={images.back} />
        </View>
      );
    },
    rightComponent: RightComponent,
  } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <DebounceTouchableOpacity
          style={styles.goBack}
          interval={0}
          activeOpacity={TouchableOpacityActiveOpacity}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          onPress={goBack}>
          {goBack || LeftComponent ? <LeftComponent /> : null}
        </DebounceTouchableOpacity>
      </View>
      <View style={[styles.center]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {RightComponent && (
        <View style={styles.right}>
          <RightComponent />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: colors.title,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  center: {
    // justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    position: 'absolute',
    left: '40%',
    top: '18%',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  right: {
    position: 'absolute',
    right: '2%',
    top: '18%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  goBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackIcon: {
    width: 23,
    height: 23,
  },
  site: {
    width: 24,
  },
});
