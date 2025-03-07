import React from 'react';

import {useTabBarHide} from '@src/hooks';
import {PRIVACY_POLICY_URL} from '@src/util';
import {CustomWebView} from '@src/components';

export function PrivacyPolicyRootPage() {
  return <CustomWebView uri={PRIVACY_POLICY_URL} />;
}

export function PrivacyPolicySettingPage() {
  useTabBarHide(true);

  return <CustomWebView uri={PRIVACY_POLICY_URL} />;
}
