import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import React, {Suspense} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '@src/page';
import {RiotMatchData, useRiotMatchInfiniteQuery} from '@src/api';
import {PagenationLoading} from '@src/components';
import {useRefreshByUser} from '@src/hooks';
import {Avatar} from 'react-native-paper';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {MatchInfoPosition, WINDOW_HEIGHT} from '@src/util';

type Props = StackScreenProps<MyPageStackParamList, 'MyMatchDetailInfo'>;
export default function MathDetailInfo({route}: Props) {
  const userId = route.params.userId;

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading</Text>
        </View>
      }>
      <MatchDetailUser userId={userId} />
    </Suspense>
  );
}

export function MatchDetailUser({userId}: {userId: string}) {
  const {data, refetch, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useRiotMatchInfiniteQuery(userId);

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages.flatMap(page => page)}
        renderItem={({item}) => <MatchInfo {...item} />}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <PagenationLoading isLoading={isFetchingNextPage} />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        refreshing={isRefetchingByUser}
        style={styles.flatList}
      />
    </View>
  );
}

function MatchInfo(props: RiotMatchData) {
  const {
    win,
    championImageUrl,
    matchType,
    timePlayed,
    startTime,
    item1ImageUrl,
    item2ImageUrl,
    item3ImageUrl,
    item4ImageUrl,
    item5ImageUrl,
    item6ImageUrl,
    trinketImageUrl,
    totalMinionsKilled,
    spell1ImageUrl,
    spell2ImageUrl,
    killParticipation,
    kills,
    deaths,
    assists,
    teamPosition,
    kda,
  } = props;
  const minuet = Math.floor(timePlayed / 60);
  const second = timePlayed % 60;
  const itemAray = [
    item1ImageUrl,
    item2ImageUrl,
    item3ImageUrl,
    item4ImageUrl,
    item5ImageUrl,
    item6ImageUrl,
    trinketImageUrl,
  ];
  const spellArray = [spell1ImageUrl, spell2ImageUrl];

  const changeDate = (date: string) => {
    const now = Date.now();
    const gameDate = new Date(date).getTime();
    const differencedDate = now - gameDate; // in milliseconds

    const minutes = Math.floor(differencedDate / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전 `;
    } else if (days < 30) {
      return `${days}일 전`;
    } else if (days < 365) {
      return `${months}월 전`;
    } else {
      return `${years}년 전`;
    }
  };

  return (
    <View style={win ? matchStyles.winContainer : matchStyles.defeatContainer}>
      <View>
        <Text style={win ? matchStyles.winText : matchStyles.defeatText}>
          {win ? '승리' : '패배'}
        </Text>
        <Text style={matchStyles.boldText}>{matchType}</Text>
        <View style={matchStyles.line} />
        <Text>
          {minuet}분 {second}초
        </Text>
        <Text>{changeDate(startTime)}</Text>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.championImageContainer}>
          <Avatar.Image
            source={{uri: championImageUrl}}
            size={responsiveScreenWidth(12)}
            style={styles.championImage}
          />
          <View style={styles.spellContainer}>
            {spellArray.map(uri => (
              <Image key={uri} style={styles.spellImage} source={{uri}} />
            ))}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.blackText}>{kills}</Text>
          <Slash />
          <Text style={styles.redText}>{deaths}</Text>
          <Slash />
          <Text style={styles.blackText}>{assists}</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View>
          <Text>킬관여 {Math.floor(killParticipation * 100)}%</Text>
          <Text>CS {totalMinionsKilled}</Text>
          <Text>포지션 {MatchInfoPosition[teamPosition]}</Text>
          <Text style={kda > 4 ? styles.redText : styles.blackText}>
            KDA {kda.toFixed(1)}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          {itemAray.map((url, index) => (
            <Image source={{uri: url}} key={index} style={styles.itemImage} />
          ))}
        </View>
      </View>
    </View>
  );
}

function Slash() {
  return <Text style={styles.slash}> / </Text>;
}

const basicContainer = StyleSheet.create({
  container: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    height: WINDOW_HEIGHT / 6,
    alignItems: 'center',
  },
});
const matchStyles = StyleSheet.create({
  winContainer: {
    backgroundColor: '#ecf2ff',
    ...basicContainer.container,
  },
  defeatContainer: {
    backgroundColor: '#fff1f3',
    ...basicContainer.container,
  },
  line: {
    width: responsiveScreenWidth(8),
    borderBottomWidth: 2,
    borderColor: '#cccccc',
    marginVertical: 4,
  },
  winText: {
    color: '#4171d6',
    fontWeight: 'bold',
  },
  defeatText: {color: 'red', fontWeight: 'bold'},
  boldText: {
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 100,
  },
  flatList: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  championImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  championImage: {
    marginLeft: 8,
  },
  spellContainer: {
    marginLeft: 4,
  },
  spellImage: {
    width: responsiveScreenWidth(8),
    height: responsiveScreenWidth(8),
    borderRadius: 12,
    marginBottom: 2,
  },
  itemContainer: {
    flex: 1.6,
    marginLeft: 4,
  },
  itemImage: {
    width: responsiveScreenWidth(5.4),
    height: responsiveScreenWidth(5.4),
    borderRadius: 6,
    backgroundColor: 'black',
    marginRight: 1,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  slash: {
    color: 'black',
    fontSize: 16,
  },
  blackText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
