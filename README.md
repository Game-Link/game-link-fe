## React native 동작하기

## 1. 기본 SETTING

- node가 설치되고 전역환경에서 접근할 수 있어야 합니다.
- ios 세팅은 다음과 같이 진행을 합니다. [링크](https://reactnative.dev/docs/set-up-your-environment)
- android 설정은 다음과 같이 진행을 합니다.

  - 우선 android studio를 설치합니다. [링크](https://developer.android.com/studio?hl=ko&_gl=1*1jxywkb*_up*MQ..*_ga*MTczNTY4MDUyNi4xNzI2NTU2ODA3*_ga_6HH9YJMN9M*MTcyNjU1NjgwNy4xLjAuMTcyNjU1NjgxOC4wLjAuMjA2MjE5MjQzMA..)
  - 공식문서의 ios android 설정을 참고 합니다. [링크](https://reactnative.dev/docs/set-up-your-environment?platform=android) android studio가 설치가 되었다면 다음과 같은 설정이 필요합니다.
    <img src = "./readme/android-setting-1.PNG" alt="안드로이드 세팅">

    <img src = "./readme/android-setting-2.PNG" alt="안드로이드 세팅">

    <img src = "./readme/android-setting-3.PNG" alt="안드로이드 세팅">

  이후 공식문서에서 요구하는 모든 설정을 진행하시면 되겠습니다.

## 2. 라이브러리 설치하기

- yarn 커맨드를 입력해서 필요로 하는 라이브러리를 모두 설치합니다.
- ios 폴더로 이동을 합니다. `cd ios` 이후 `pod install`을 실행합니다.

## 3. 시작하기

- android : yarn start 명령어 입력 이후 a 클릭 혹은 yarn android
- ios : yarn start 명령어 입력 이후 i 클릭 혹은 yarn ios
