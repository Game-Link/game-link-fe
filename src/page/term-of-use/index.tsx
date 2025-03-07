import React from 'react';

import {useTabBarHide} from '@src/hooks';
import {TERM_OF_USE_URL} from '@src/util';
import {CustomWebView} from '@src/components';

export function TermOfUseRootPage() {
  return <CustomWebView uri={TERM_OF_USE_URL} />;
}

export function TermOfUseSettingPage() {
  useTabBarHide(true);

  return <CustomWebView uri={TERM_OF_USE_URL} />;
}
