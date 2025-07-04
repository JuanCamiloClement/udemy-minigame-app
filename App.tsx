import { FC, useState, JSX, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { StartGameScreen } from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import { Colors } from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const handlePickNumber = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
  };

  const [screen, setScreen] = useState<JSX.Element>(<StartGameScreen onConfirm={handlePickNumber} />)

  const handleGoBack = () => {
    setUserNumber(null);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  useEffect(() => {
    if (isGameOver) {
      setScreen(<GameOverScreen />)
    } else if (!!userNumber && !isGameOver) {
      setScreen(<GameScreen userNumber={userNumber} onBack={handleGoBack} onGameOver={handleGameOver} />)
    } else {
      setScreen(<StartGameScreen onConfirm={handlePickNumber} />)
    }
  }, [isGameOver, userNumber]);

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
