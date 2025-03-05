import {View, StyleSheet} from 'react-native';
import React from 'react';
import WebView, {WebViewProps} from 'react-native-webview';

type Props = {uri: string} & WebViewProps;

export default function CustomWebView({uri, ...props}: Props) {
  return (
    <View style={styles.container}>
      <WebView source={{uri}} style={styles.webView} {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {flex: 1},
});
