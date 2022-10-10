import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {t} from '../../i18n';

interface Props {
  confirm: () => void;
  cancel: () => void;
  goProtocol: (type: 'terms' | 'privacy') => void;
}

const {width, height} = Dimensions.get('window');

export default (props: Props) => {
  const {cancel, confirm, goProtocol} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <Text style={styles.title}>{t('app.protocol.tips')}</Text>
        <Text style={styles.content}>
          {t('app.protocol.content')}
          <Text style={styles.link} onPress={() => goProtocol('privacy')}>
            {t('app.protocol.privacy')}
          </Text>
          {t('app.protocol.and')}
          <Text style={styles.link} onPress={() => goProtocol('terms')}>
            {t('app.protocol.terms')}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.8}
          onPress={confirm}>
          <Text style={styles.confirmText}>{t('app.protocol.agree')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.8}
          onPress={cancel}>
          <Text style={styles.cancelText}>{t('app.protocol.disAgree')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: '#fff',
  },
  inner: {
    paddingHorizontal: 60,
  },
  title: {
    color: 'rgba(0,0,0,.8)',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    color: 'black',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 20,
  },
  link: {
    color: '#0083FF',
  },
  confirmBtn: {
    backgroundColor: '#29B37B',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    width: '100%',
    marginTop: 60,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  cancelText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
