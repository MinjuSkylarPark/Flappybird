import React,{ useEffect, useState } from 'react';
//Touchablewithoutfeedback -> 화면전체를 감싸고 화면을 터지하자마자 점프하도록하는 속성
import { Dimensions, StyleSheet,View, TouchableWithoutFeedback,Text, ImageBackground} from 'react-native';
import Bird from './Components/Bird';
import Obstacles from './Components/Obstacles';
// import flapSky from './assets/flapSky.png'

export default function App() {
  
//디바이스기종에 상관없이 화면크기를 설정한다. 게임화면이 똑같이 출력되도록
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const BirdLeft = screenWidth / 2
  //상태기본값을 파라미터로 넣어줌 
  //장애물일경우에 0은 같은 크기로 출력되는 것 게임스코어의 경우에는 점수판이 0부터 시작하는 것 
  const [Score,setScore] = useState(0)
  const [BirdBottom,setBirdBottom] = useState(screenHeight /2)
  const [ObstaclesLeft,setObstaclesLeft]= useState(screenWidth); 
  const [ObstaclesLeftTwo,setObstaclesLeftTwo]= useState(screenWidth + screenWidth / 2 + 30); 
  //랜덤함수부여
  //현재설정되어있는 칼럼의 길이 랜덤설정 useState(0)로 설정해서 시작은 항상 같은길이로 출력.
  const [ObstaclesNegHeight, setoOstaclesNegheight] = useState(0)
  //랜덤한길이로 시작하는 칼럼 2개 생성 - 시작부터 다르게 항
  const [ObstaclesNegHeightTwo, setoOstaclesNegheightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  //플래피버드가 지나가는 장애물 사이의 공간
  const gap = 200
  //중력때문에 새가 아래로 가는거라 변수명=중력
  const gravity = 3
  const image ={ uri:"https://firebasestorage.googleapis.com/v0/b/cookie-32b62.appspot.com/o/FlaapSkyy.png?alt=media&token=cfcfa3a4-b56e-4a7b-ae9b-007fc70a3dae"}

  //상단에 이렇게 정의해주면 필요한곳은 어디든 다 갖다 쓸 수 있음
  let gameTimerId
  let obstaclesLeftTimerId
  let ObstaclesLeftTimerIdTwo
  const [isgameOver,setgameOver] = useState(false)
  let randomBottom


  //새가 아래로 떨어지는 부분
  useEffect(()=>{
    if(BirdBottom > 0 ){
      //setInterval:일정시간 마다 함수가 자동으로 실행되도록 처리
      gameTimerId =  setInterval(()=>{
        setBirdBottom(BirdBottom => BirdBottom - gravity )
      },30)
      return ()=>{
        // clearInterval: setInterval 로 설정한 작업을 취소
        clearInterval(gameTimerId)
      }
    }
    //useEffect사용시에는,[]<-내부에 값을 꼭 돌려준다 
  },[BirdBottom])
  console.log(BirdBottom)

  //하단의 setgameOver과 이어짐
  const jump = ()=>{
    //새는 장애물을 위로 점프하며 넘어간다
    if(!isgameOver && (BirdBottom < screenHeight)){
      setBirdBottom(BirdBottom => BirdBottom+ 50)
      console.log('jump')
    }
  }
  //최초 장애물 설정
  useEffect(()=>{
    if(ObstaclesLeft > - obstacleWidth){
      obstaclesLeftTimerId =  setInterval(() => {
        setObstaclesLeft(ObstaclesLeft => ObstaclesLeft-5)
      }, 30)
      return()=>{
        clearInterval(obstaclesLeftTimerId) 
      } 
    }else{
      setObstaclesLeft(screenWidth)
      //랜덤한길이를 출력하는 map함수설정
      //0-100까지 사이의 수가 무작위로 기둥의높이를 설정함
      setoOstaclesNegheight(-Math.random() * 100)
      setScore(Score => Score + 1 )
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
      return()=>{
        //setInterval 설정무효화
        clearInterval(ObstaclesLeftTimerIdTwo) 
      } 
    }else{
      setObstaclesLeftTwo(screenWidth)
      setoOstaclesNegheightTwo( - Math.random()*100)
      setScore(Score => Score + 1 )
    }
    //여기서 return은 if다음 else역할을 함
  },[ObstaclesLeftTwo])

   useEffect(()=>{
      if (
      ((BirdBottom<(ObstaclesNegHeight + obstacleHeight  ) ) || 
      BirdBottom>(ObstaclesNegHeight + obstacleHeight + gap )) && 
      (ObstaclesLeft> screenWidth/2 && ObstaclesLeft < screenWidth/2 + 30 )
      || 
      (BirdBottom<(ObstaclesNegHeightTwo + obstacleHeight ) ) || 
      BirdBottom>(ObstaclesNegHeightTwo + obstacleHeight + gap ) && 
      (ObstaclesLeftTwo> screenWidth/2 && ObstaclesLeftTwo < screenWidth/2 + 30 )
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
    setgameOver(true)
  }

  return (

    <TouchableWithoutFeedback onPress={jump} >

      <View style={styles.container}>
      
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
      {isgameOver && <Text style={styles.score}>{Score}</Text>}
      {isgameOver && <Text style={styles.Gameover}>Game over</Text>}
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
    
        </ImageBackground>
    
      </View>
   

    </TouchableWithoutFeedback>

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1,
    justifyContent:'center',
  },
  score:{
    fontSize:10,
    color:'red',
    marginLeft:90,
  },
  Gameover:{
    fontSize:40,
    color:'black',
    marginLeft:90,
    marginBottom:100,
    alignContent:'center',
    justifyContent:'center',
  
  }
});
