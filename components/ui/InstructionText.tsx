import { Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

type InstructionTextProps = {
  children: string;
  style?: Record<string, string | number>;
}

const styles = StyleSheet.create({
  instruction: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: 'open-sans',
  },
});

export const InstructionText = ({ children, style }: InstructionTextProps) => {
  return (
    <Text style={[styles.instruction, style && style]}>{children}</Text>
  );
};