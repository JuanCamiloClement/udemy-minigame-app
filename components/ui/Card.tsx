import { JSX } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../../constants/colors";

type CardProps = {
  children: JSX.Element[];
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
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
});

export const Card = ({ children }: CardProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View style={[styles.card, isLandscape && { flex: 1 }]}>
      {children}
    </View>
  );
};