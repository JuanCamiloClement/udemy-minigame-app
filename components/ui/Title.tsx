import { Text, StyleSheet } from 'react-native';

type TitleProps = {
  children: string;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
});

export const Title = ({ children }: TitleProps) => {
  return (
    <Text style={styles.title}>{children}</Text>
  );
};