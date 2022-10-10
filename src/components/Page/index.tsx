import React from 'react';
import {ViewStyle} from 'react-native';
import Header, {HeaderComponentProps} from '../Header';
import PageWrapper from '../PageWrapper';

// import {StyleSheet} from 'react-native';

interface Props {
  header: HeaderComponentProps;
  children: React.ReactNode | JSX.Element;
  style?: ViewStyle;
}

export default (props: Props) => {
  const {children, header, style} = props;

  return (
    <PageWrapper style={style}>
      <Header {...header} />
      {children}
    </PageWrapper>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.04)',
//   },
// });
