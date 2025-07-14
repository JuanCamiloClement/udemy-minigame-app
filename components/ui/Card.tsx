import { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

type CardProps = {
  children: JSX.Element[];
}

const styles = StyleSheet.create({
  card: {
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
});

export const Card = ({ children }: CardProps) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};