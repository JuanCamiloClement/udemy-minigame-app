import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Colors } from '../constants/colors';
import { Title } from '../components/ui/Title';
import { Card } from '../components/ui/Card';
import { InstructionText } from '../components/ui/InstructionText';

type StartGameScreenProps = {
  onConfirm: (pickedNumber: number) => void;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 'auto',
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});

export const StartGameScreen = ({ onConfirm }: StartGameScreenProps) => {
  const [enteredNumber, setEnteredNumber] = useState<string>('');
  const { height } = useWindowDimensions();

  const handleNumberInput = (input: string) => {
    setEnteredNumber(input);
  };

  const handleReset = () => {
    setEnteredNumber('');
  };

  const handleConfirm = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'The number sent must be between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: handleReset }]
      );
      return;
    }

    onConfirm(chosenNumber);
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, { marginTop: height < 480 ? 30 : 100 }]}>
          <Title>Guess my Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType='number-pad'
              autoCapitalize='none'
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={handleNumberInput}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleReset}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};