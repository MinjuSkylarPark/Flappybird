import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './Components/Bird';

export default function App() {
  
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  //중앙에있는 새를 장애물충돌시의 상황에대비해 왼쪽으로 둔다.
  //새는 위아래로만 이동하며 좌우로 움직이지않는다. 
  const BirdLeft = screenWidth / 2
  const [BirdBottom,setBirdBottom] = useState(screenHeight / 2) 
  //중력때문에 새가 아래로 가는거라 변수명=중력
  const gravity = 3
  let gameTimerId

  //새가 아래로 떨어지는 부분
  useEffect(()=>{
    if(BirdBottom > 0 ){
      //setInterval:일정시간 마다 함수가 실행되도록 처리하
      gameTimerId =  setInterval(()=>{
       //새는 일정시간마다 밑바닥으로 향하게된다
        setBirdBottom(BirdBottom => BirdBottom - gravity )
        //3초 
      },30)
      return ()=>{
        // clearInterval: setInterval 로 설정한 작업을 취소
        clearInterval(gameTimerId)
      }
    }
  },[BirdBottom])
  console.log(BirdBottom)

  return (
    <View style={styles.container}>
      <Text>open your app.js project</Text>
      <Bird 
      BirdBottom={BirdBottom}
      BirdLeft={BirdLeft}/>
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
