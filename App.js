import React , { useEffect, useState } from 'react';
//Touchablewithoutfeedback -> 화면전체를 감싸고 화면을 터지하자마자 점프하도록하는 속성
import { Dimensions, StyleSheet,View, TouchableWithoutFeedback } from 'react-native';
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
  const [ObstaclesLeftTwo,setObstaclesLeftTwo]= useState(screenWidth + screenWidth / 2 ); 
  //랜덤함수부여
  const [ObstaclesNegHeight, setoOstaclesNegheight] = useState(0)
  const [ObstaclesNegHeightTwo, setoOstaclesNegheightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  //플래피버드가 지나가는 장애물 사이의 공간
  const gap = 200
  //중력때문에 새가 아래로 가는거라 변수명=중력
  const gravity = 3
  //상단에 이렇게 정의해주면 필요한곳은 어디든 다 갖다 쓸 수 있음
  let gameTimerId
  let obstaclesLeftTimerId
  let ObstaclesLeftTimerIdTwo
  let randomBottom
  // let isgameOver = false
  const [isgameOver,setgameOver] = useState(false)
  


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
    //useEffect사용시에는,[]<-내부에 값을 꼭 돌려준다 
  },[BirdBottom])
  //새떨어질때 위치보려고 출력하는거
  console.log(BirdBottom)

  //하단의 setgameOver과 이어짐
  const jump = ()=>{
    if(!isgameOver && (BirdBottom < screenHeight)){
      setBirdBottom(BirdBottom => BirdBottom+ 50)
      console.log('jump')
    }
  }

  //최초 장애물 설정
  useEffect(()=>{
    //장애물은 일정시간마다 왼쪽으로 이동한다
    //ObstaclesLeft > - obstacleWidth => 장애물 사라지게하기
    if(ObstaclesLeft > - obstacleWidth){
      obstaclesLeftTimerId =  setInterval(() => {
        // 매 0.3초마다 장애물이 왼쪽 5픽셀씩 움직이게 설정
        setObstaclesLeft(ObstaclesLeft => ObstaclesLeft-5)
      }, 30);
    }else{
      setObstaclesLeft(screenWidth)
      setoOstaclesNegheight(-Math.random() * 100)
      
    }
    //여기서 return은 if다음 else역할을 함
    return()=>{
      //setInterval 설정무효화
      clearInterval(obstaclesLeftTimerId) 
    } 
  },[ObstaclesLeft])

  //두번째 장애물 설정
  useEffect(()=>{
    //장애물은 일정시간마다 왼쪽으로 이동한다
    //ObstaclesLeft > - obstacleWidth => 장애물 사라지게하기
    if(ObstaclesLeftTwo > - obstacleWidth){
      ObstaclesLeftTimerIdTwo =  setInterval(() => {
        // 매 0.3초마다 장애물이 왼쪽 5픽셀씩 움직이게 설정
        setObstaclesLeftTwo(ObstaclesLeftTwo => ObstaclesLeftTwo - 5)
      }, 30);
    }else{
      setObstaclesLeftTwo(screenWidth)
      setoOstaclesNegheightTwo(-Math.random()*100)

    }
    //여기서 return은 if다음 else역할을 함
    return()=>{
      //setInterval 설정무효화
      clearInterval(ObstaclesLeftTimerIdTwo) 
    } 
  },[ObstaclesLeftTwo])

// 새가 기둥과 충돌했을 때
useEffect(()=>{
  if (
  ((BirdBottom<(ObstaclesNegHeight + obstacleHeight ) ) || 
   BirdBottom>(ObstaclesNegHeight + obstacleHeight + gap )) && 
  (ObstaclesLeft> screenWidth && ObstaclesLeft < screenWidth/2 + 30)
  || 
  (BirdBottom<(ObstaclesNegHeightTwo + obstacleHeight ) ) || 
  BirdBottom>(ObstaclesNegHeightTwo + obstacleHeight + gap ) && 
  (ObstaclesLeftTwo> screenWidth && ObstaclesLeftTwo < screenWidth/2 + 30)
 
  )  
  {
  console.log("game over")
    gameOver()
  }
})

  const gameOver = () =>{
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(ObstaclesLeftTimerIdTwo)
     //최상단 let isgameOver = false 다음과 이어짐
    setgameOver(true)
  }

  return (
    //View밖의 화면 전체를 감싸고 스크린을 터치함과 동시에
    //새 점프시키기 
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird 
          BirdBottom={BirdBottom}
          BirdLeft={BirdLeft}/>
        <Obstacles 
          color={'blue'}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={ObstaclesNegHeight}
          gap={gap}
          ObstaclesLeft={ObstaclesLeft}/>
        <Obstacles 
          color={'green'}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={ObstaclesNegHeightTwo}
          gap={gap}
          ObstaclesLeft={ObstaclesLeftTwo}/>
      </View>
    </TouchableWithoutFeedback>

  
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
