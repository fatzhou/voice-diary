import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  button: {
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  text: {
    color: 'white',
  },
});

export default styles;
