import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    height: 50,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 16,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#F9F9F9',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  voice: {
    height: 25,
    width: 25,
  },
});
