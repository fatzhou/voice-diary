import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {ReactElement, ReactNode} from 'react';

import {Component} from 'react';

// import NativeButton from 'apsl-react-native-button';

const styles: any = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: 'rgb(243,243,243)',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: '#333',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: 'white',
  },
  imgLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

interface ItemProps {
  children?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  style?: any;
  disabledStyle?: any;
  textStyle?: any;
  imgLeftSrc?: any;
  imgLeftStyle?: any;
  indicatorColor?: string;
  activeOpacity?: number;
}

class Button extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    isLoading: false,
    isDisabled: false,
    style: styles.btn,
    textStyle: styles.txt,
    imgLeftStyle: styles.imgLeft,
    indicatorColor: 'white',
    activeOpacity: 0.5,
  };

  constructor(props: ItemProps) {
    super(props);
    this.state = {};
  }

  public render(): ReactElement {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.disabledStyle}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }

    if (this.props.isLoading) {
      return (
        <View style={this.props.style}>
          <ActivityIndicator size="small" color={this.props.indicatorColor} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.imgLeftSrc ? (
            <Image
              style={this.props.imgLeftStyle}
              source={this.props.imgLeftSrc}
            />
          ) : null}
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;

// import React, {forwardRef} from 'react';
// import {
//   Image,
//   ImageProps,
//   LayoutChangeEvent,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// const styles = StyleSheet.create({
//   button: {
//     width: 25,
//     height: 25,
//     padding: 0,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
// });

// interface Props {
//   icon: ImageProps;
//   onPress?: () => void;
//   onLayout?: (e: LayoutChangeEvent) => void;
// }

// const Button = forwardRef<TouchableOpacity, Props>(
//   ({icon, onPress, onLayout}, ref) => (
//     <TouchableOpacity
//       ref={ref}
//       onPress={onPress}
//       style={styles.button}
//       onLayout={onLayout}>
//       <Image source={icon} style={styles.icon} />
//     </TouchableOpacity>
//   ),
// );

// export default Button;
