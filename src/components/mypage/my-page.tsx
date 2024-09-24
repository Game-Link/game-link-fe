import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {Avatar} from 'react-native-paper';
import {LogoutButton, RiotAccountButton, Span} from '@src/components';
import {useRiotInfo} from '@src/api';

export default function Profile() {
  const riotInfo = useRiotInfo();

  console.log(riotInfo.data);
  if (riotInfo.isSuccess) {
    console.log(riotInfo.data);
  }
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={70}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          style={{marginRight: 10}}
        />
        <View>
          <View style={styles.nicknameContainer}>
            <Span style={styles.avatarName} text={'유저 랜덤 닉네임'} />
            <Pressable style={styles.nicknameButton}>
              <Text style={styles.nicknameButtonText}>변경</Text>
            </Pressable>
          </View>
          <Span text="유저 전화번호" />
        </View>
      </View>

      <View style={styles.buttonView}>
        <RiotAccountButton
          style={{marginRight: 4}}
          isLogin={riotInfo.data?.userId}
        />
        <LogoutButton />
      </View>

      <View style={styles.bodyContent}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.info}>UX Designer / Mobile developer</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
          electram expetendis, omittam deseruisse consequuntur ius an,
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    fontWeight: 'bold',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarName: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  nicknameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nicknameButton: {
    padding: 3,
    backgroundColor: '#8e7cc3',
    marginLeft: 4,
    borderRadius: 5,
  },
  nicknameButtonText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
});
