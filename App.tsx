import { useState, JSX, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { StartGameScreen } from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import { Colors } from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();

  const handlePickNumber = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
  };

  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [rounds, setRounds] = useState<number>(0);

  const handleIncreaseRound = () => {
    setRounds((prev) => prev + 1);
  };

  const [screen, setScreen] = useState<JSX.Element>(<StartGameScreen onConfirm={handlePickNumber} />)

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleStartNewGame = () => {
    setUserNumber(null);
    setIsGameOver(false);
    setRounds(0);
    setScreen(<StartGameScreen onConfirm={handlePickNumber} />);
  }

  useEffect(() => {
    if (isGameOver) {
      setScreen(<GameOverScreen rounds={rounds} userNumber={userNumber as number} onStartNewGame={handleStartNewGame} />)
    } else if (!!userNumber && !isGameOver) {
      setScreen(<GameScreen userNumber={userNumber} onGameOver={handleGameOver} onNewClue={handleIncreaseRound} />)
    } else {
      setScreen(<StartGameScreen onConfirm={handlePickNumber} />)
    }
  }, [isGameOver, userNumber]);

  const [areFontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!areFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='light' />
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
    </>
  );
}
