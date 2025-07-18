import { Text, StyleSheet } from 'react-native';

type TitleProps = {
  children: string;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});

export const Title = ({ children }: TitleProps) => {
  return (
    <Text style={styles.title}>{children}</Text>
  );
};