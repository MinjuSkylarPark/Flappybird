import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './Components/Bird';

export default function App() {
  
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  
  console.log(screenWidth)
  console.log(screenHeight)

  return (
    <View style={styles.container}>
      <Text> app!</Text>
      <Bird/>
      <StatusBar style="auto" hidden={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
