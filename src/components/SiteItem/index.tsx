import React, {useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import images from '../../core/images';
import TouchableOpacity from '../TouchableOpacity';

interface Props {
  leftComponent: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftIcon?: string;
  isLastChild?: boolean;
  goNextPage?: (value: any) => void;
}

export default (props: Props) => {
  const {
    leftComponent,
    rightComponent,
    isLastChild = false,
    leftIcon,
    goNextPage = () => null,
  } = props;

  const defaultRightComponent = useMemo(() => {
    return <Image source={images.site.enter} style={styles.enter} />;
  }, []);

  const defaultSeparator = useMemo(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.left}>
          {leftIcon ? (
            <Image
              source={(images as any).site[leftIcon]}
              style={styles.icon}
            />
          ) : null}
          {leftComponent}
        </View>
        <TouchableOpacity onPress={goNextPage} style={styles.right}>
          {rightComponent}
          {defaultRightComponent}
        </TouchableOpacity>
      </View>
      {isLastChild && defaultSeparator}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    height: 58,
  },
  enter: {
    width: 24,
  },
  icon: {
    width: 24,
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    height: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
