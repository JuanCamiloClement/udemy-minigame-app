import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { Colors } from '../../constants/colors';

type NumberContainerProps = {
  children: number;
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontFamily: 'open-sans-bold',
  },
});

export const NumberContainer = ({ children }: NumberContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View style={[styles.container, isLandscape && { flex: 1 }]}>
      <Text style={styles.numberText}>{children.toString()}</Text>
    </View>
  );
};