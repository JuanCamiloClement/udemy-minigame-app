import { useState, useRef } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';

import { Title } from '../components/ui/Title';
import { NumberContainer } from '../components/game/NumberContainer';
import { PrimaryButton } from '../components/ui/PrimaryButton';

type GameScreenProps = {
  userNumber: number,
  onGameOver: () => void;
  onBack: () => void;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
  },
});

const generateRandomNumber = (min: number, max: number, exclude: number): number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }

  return randomNumber
};

export const GameScreen = ({ userNumber, onGameOver, onBack }: GameScreenProps) => {
  const minBoundaryRef = useRef<number>(1)
  const maxBoundaryRef = useRef<number>(100)
  const initialGuess = generateRandomNumber(minBoundaryRef.current, maxBoundaryRef.current, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

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
        break;
      case 'greater':
        minBoundaryRef.current = currentGuess + 1;
        break;
    };

    const newGuess = generateRandomNumber(minBoundaryRef.current, maxBoundaryRef.current, currentGuess);

    if (newGuess === userNumber) {
      onGameOver();
      return;
    }

    setCurrentGuess(newGuess);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={handleNextGuess.bind(this, 'greater')}>+</PrimaryButton>
          <PrimaryButton onPress={handleNextGuess.bind(this, 'lower')}>-</PrimaryButton>
        </View>
      </View>
      <Button title="Back" onPress={onBack} />
    </View>
  );
};