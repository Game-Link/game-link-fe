#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <Firebase.h>
#import <React/RCTLinkingManager.h>
#import "RNSplashScreen.h"
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

// APNS 토큰을 Firebase Messaging에 등록하는 메서드.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  NSLog(@"원격 알림 등록 완료, device token: %@", deviceToken);
  [FIRMessaging messaging].APNSToken = deviceToken;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  // 네이버 로그인 URL 처리
  if ([url.scheme isEqualToString:@"your_custom_url_scheme"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }
  
  // React Native LinkingManager URL 처리
  if ([RCTLinkingManager application:application openURL:url options:options]) {
    return YES;
  }
  
  // 처리되지 않은 URL은 NO 반환
  return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  
  // Firebase 초기화 (아직 초기화되지 않은 경우)
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
  self.moduleName = @"gameLink";
  self.initialProps = @{};

  // 알림 권한 요청 및 원격 알림 등록
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      dispatch_async(dispatch_get_main_queue(), ^{
        [application registerForRemoteNotifications];
      });
    } else {
      NSLog(@"알림 권한이 부여되지 않음: %@", error);
    }
  }];
  
  // 스플래시 스크린 표시
  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (ret == YES) {
    [RNSplashScreen show];
  }
  return ret;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return [self bundleURL];
}

- (NSURL *)bundleURL {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
