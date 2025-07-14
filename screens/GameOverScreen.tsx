import { View, Text, Image, StyleSheet } from 'react-native';

import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Title } from '../components/ui/Title';
import { Colors } from '../constants/colors';

type GameOverScreenProps = {
  rounds: number;
  userNumber: number;
  onStartNewGame: () => void;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    height: '100%',
    width: '100%',
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
  return (
    <View style={styles.rootContainer}>
      <Title>Game over!</Title>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/success.png')} style={styles.image} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{' '}
        <Text style={styles.highlight}>{rounds.toString()}</Text>{' '}
        turns to guess number{' '}
        <Text style={styles.highlight}>{userNumber.toString()}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame} >Start new game</PrimaryButton>
    </View>
  );
};