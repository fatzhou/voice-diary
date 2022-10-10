import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';
import {useLanguage} from '~/core/hooks';
import {t} from '~/core/i18n';

const ProtocolComponent = ({navigation, route}) => {
  const {type} = route.params || {type: 'terms'};
  console.log(type, 'type');
  useLanguage(null);
  const {setOptions} = navigation;

  const config = {
    terms: {
      title: t('app.protocol.terms'),
      content: t('app.protocol.termsProtocol'),
    },
    privacy: {
      title: t('app.protocol.privacy'),
      content: t('app.protocol.privacyProtocol'),
    },
  };
  console.log(config[type].title, 'hahihahi');
  setOptions({
    headerTitle: config[type].title,
    title: config[type].title,
  });
  const content = config[type].content;
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeareaview}>
        <ScrollView style={styles.content}>
          <Text style={styles.text}>{content}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderStartColor: '#ccc',
  },
  safeareaview: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // paddingVertical: 24,
  },
  text: {
    fontSize: 14,
    lineHeight: 30,
    // marginBottom: 10,
    color: '#666',
  },
});
export default ProtocolComponent;
