import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './Components/Bird';
import Obstacles from './Components/Obstacles';

export default function App() {
  
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  //중앙에있는 새를 장애물충돌시의 상황에대비해 왼쪽으로 둔다.
  //새는 위아래로만 이동하며 좌우로 움직이지않는다. 
  const BirdLeft = screenWidth / 2
  const [BirdBottom,setBirdBottom] = useState(screenHeight / 2)
  //??장애물이 이동할때마다 위치설정?? 이따 설명 다시 들어보고 적겠음
  const [ObstaclesLeft,setObstaclesLeft]= useState(screenWidth); 
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 90
  //중력때문에 새가 아래로 가는거라 변수명=중력
  const gravity = 3
  //상단에 이렇게 정의해주면 필요한곳은 어디든 다 갖다 쓸 수 있음
  let gameTimerId
  let obstaclesLeftTimerId


  //새가 아래로 떨어지는 부분
  useEffect(()=>{
    if(BirdBottom > 0 ){
      //setInterval:일정시간 마다 함수가 실행되도록 처리하
      gameTimerId =  setInterval(()=>{
       //새는 일정시간-0.3초-마다 밑바닥으로 향하게된다
        setBirdBottom(BirdBottom => BirdBottom - gravity )
      },30)
      return ()=>{
        // clearInterval: setInterval 로 설정한 작업을 취소
        clearInterval(gameTimerId)
      }
    }
  },[BirdBottom])
  //새떨어질때 위치보려고 출력하는거
  console.log(BirdBottom)

  //최초 장애물 설정
  useEffect(()=>{
    //장애물은 일정시간마다 왼쪽으로 이동한다
    //만약 장애물이 장애물의 위드값보다 크다면
    if(ObstaclesLeft > - obstacleWidth){
      obstaclesLeftTimerId =  setInterval(() => {
        // 매 0.3초마다 장애물이 왼쪽 5픽셀씩 움직이게 설정
        setObstaclesLeft(ObstaclesLeft => ObstaclesLeft-5)
      }, 30);
    }else{
      setObstaclesLeft(screenWidth)
    }
    //여기서 return은 if다음 else역할을 함
    return()=>{
      //setInterval 설정무효화
      clearInterval(obstaclesLeftTimerId) 
    } 

  },[ObstaclesLeft])

  return (
    
    <View style={styles.container}>
      <Bird 
        BirdBottom={BirdBottom}
        BirdLeft={BirdLeft}/>
      <Obstacles 
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap={gap}
        ObstaclesLeft={ObstaclesLeft}/>
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
