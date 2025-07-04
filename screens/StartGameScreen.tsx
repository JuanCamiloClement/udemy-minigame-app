import { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Colors } from '../constants/colors';
import { Title } from '../components/ui/Title';

type StartGameScreenProps = {
  onConfirm: (pickedNumber: number) => void;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // boxShadow: '2px 0px black',
    // In previous RN versions, boxShadow was not supported:
    // android specific:
    elevation: 100,
    // iOS specific:
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
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
    <View style={styles.rootContainer}>
      <Title>Guess my Number</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>Enter a number</Text>
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
      </View>
    </View>
  )
};