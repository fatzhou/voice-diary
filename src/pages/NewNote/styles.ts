import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  title: {
    height: 50,
    fontSize: 20,
    // backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    // marginHorizontal: 15,
    color: '#333',
  },
  editor: {
    marginTop: 5,
    flex: 1,
    // paddingHorizontal: 20,
  },
});
