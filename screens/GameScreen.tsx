import { useState, useRef } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Title } from '../components/ui/Title';
import { NumberContainer } from '../components/game/NumberContainer';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Card } from '../components/ui/Card';
import { InstructionText } from '../components/ui/InstructionText';
import { GameLogItem } from '../components/game/GuessLogItem';

type GameScreenProps = {
  userNumber: number,
  onGameOver: () => void;
  onNewClue: () => void;
}

type RoundLog = {
  id: number;
  guess: number;
  round: number;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  gameZoneContainer: {
    width: '100%',
  },
  gameZoneContainerWide: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

const generateRandomNumber = (min: number, max: number, exclude: number): number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }

  return randomNumber
};

export const GameScreen = ({ userNumber, onGameOver, onNewClue }: GameScreenProps) => {
  const minBoundaryRef = useRef<number>(1)
  const maxBoundaryRef = useRef<number>(100)
  const initialGuess = generateRandomNumber(minBoundaryRef.current, maxBoundaryRef.current, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<RoundLog[]>([{ id: initialGuess, guess: initialGuess, round: 1 }]);
  const { width, height } = useWindowDimensions();

  const handleNextGuess = (direction: 'lower' | 'greater') => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert(
        "Don't lie!",
        "Lying is wrong",
        [{ text: "Sorry!", style: 'cancel' }]
      );
      return;
    }

    switch (direction) {
      case 'lower':
        maxBoundaryRef.current = currentGuess;
        onNewClue()
        break;
      case 'greater':
        minBoundaryRef.current = currentGuess + 1;
        onNewClue()
        break;
    };

    const newGuess = generateRandomNumber(minBoundaryRef.current, maxBoundaryRef.current, currentGuess);

    if (newGuess === userNumber) {
      onGameOver();
      maxBoundaryRef.current = 100;
      minBoundaryRef.current = 1;
      return;
    }

    setCurrentGuess(newGuess);
    setGuessRounds((prev) => [{ id: newGuess, guess: newGuess, round: prev.length + 1 }, ...prev]);
  };

  const renderItem = ({ item }: { item: RoundLog }) => <GameLogItem guess={item.guess} round={item.round} />;

  const isLandscape = width > height;

  return (
    <View style={styles.rootContainer}>
      <Title>Opponent's guess</Title>
      <View style={isLandscape ? styles.gameZoneContainerWide : styles.gameZoneContainer}>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={handleNextGuess.bind(this, 'lower')}>
                <Ionicons name='remove' size={24} color='white' />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={handleNextGuess.bind(this, 'greater')}>
                <Ionicons name='add' size={24} color='white' />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.listContainer}>
        <FlatList data={guessRounds} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};