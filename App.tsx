import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import bg from './src/assets/bg.png'

const App = () => {
  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <HomeScreen />
    </ImageBackground>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
