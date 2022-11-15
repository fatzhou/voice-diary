import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('window');

export default StyleSheet.create({
  flex: {
    flex: 1,
    height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addNote: {
    // marginTop: 20,
    width: 50,
    height: 50,
  },
  addNoteSpeaking: {
    backgroundColor: 'rgba(255,0,0,.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  top: {},
  logo: {
    width: 64,
    height: 64,
  },
  desc: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.85)',
    marginTop: 12,
  },
  // close: {
  //   width: 48,
  //   marginTop: 20,
  // },
  dividerWrapper: {
    height: 112,
    marginBottom: 20,
    marginTop: 10,
  },
  divider: {
    width: 4,
    height: 112,
  },
  buttons: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
  },
  focusContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
  },
  close: {
    width: 20,
    height: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  focusText: {
    color: '#000',
  },
  tips: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsText: {
    color: '#999',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    height: 100,
  },
});
