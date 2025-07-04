import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

type NumberContainerProps = {
  children: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export const NumberContainer = ({ children }: NumberContainerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children.toString()}</Text>
    </View>
  );
};