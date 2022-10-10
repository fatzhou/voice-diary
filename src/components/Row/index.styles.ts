import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 58,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    marginRight: 10,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 17,
  },
  next: {
    marginLeft: 6,
  },
});
