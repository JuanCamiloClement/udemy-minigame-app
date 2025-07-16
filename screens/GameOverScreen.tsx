import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';

import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Title } from '../components/ui/Title';
import { Colors } from '../constants/colors';

type GameOverScreenProps = {
  rounds: number;
  userNumber: number;
  onStartNewGame: () => void;
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    // paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingTop: Platform.select({ ios: 0, android: 30 }),
  },
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: deviceWidth < 380 ? 150 : 300,
    width: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  interactionsContainer: {
    alignItems: 'center',
  },
  interactionsContainerWide: {
    width: '50%',
    justifyContent: 'center',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});

export const GameOverScreen = ({ rounds, userNumber, onStartNewGame }: GameOverScreenProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.screen}>
        <Title>Game over!</Title>
        <View style={isLandscape && { flexDirection: 'row' }}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/success.png')} style={styles.image} />
          </View>
          <View style={[styles.interactionsContainer, isLandscape && styles.interactionsContainerWide]}>
            <Text style={styles.summaryText}>
              Your phone needed{' '}
              <Text style={styles.highlight}>{rounds.toString()}</Text>{' '}
              turns to guess number{' '}
              <Text style={styles.highlight}>{userNumber.toString()}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame} >Start new game</PrimaryButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};