import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
  contentLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmpty: {
    marginTop: 154,
  },
  footerLoading: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerPadding: {
    paddingBottom: 12,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerDivider: {
    width: 46,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 8,
    // backgroundColor: colors.dividerLine,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});
