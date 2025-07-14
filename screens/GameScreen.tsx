import { useState, useRef } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Title } from '../components/ui/Title';
import { NumberContainer } from '../components/game/NumberContainer';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Card } from '../components/ui/Card';
import { InstructionText } from '../components/ui/InstructionText';

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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
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
      <Button title="Back" onPress={onBack} />
    </View>
  );
};