import { View, Text } from 'react-native'
import React from 'react'

//장애물로 사용할 컴포넌트를 아예 하나 만들어줌

const Obstacles= ({ObstaclesLeft,obstacleWidth,obstacleHeight,gap}) => {
  
    // const obstacleWidth = 60
    // const obstacleHeight = 300
    // const gap = 90

  //장애물 사이즈 설정
    return (
    <>
    {/* 장애물의 색깔/크기/화면내 위치설정 플래피버드는 움직이는 미로같은거라 뷰 두개*/}
    <View style={{
        position:'absolute',
        backgroundColor:'green',
        width:obstacleWidth,
        height: obstacleHeight,
        left:ObstaclesLeft,
        bottom :0 + obstacleHeight + gap,
    }}
     />
    {/* 장애물의 색깔/크기/화면내 위치설정 플래피버드는 움직이는 미로같은거라 뷰 두개*/}
    <View style={{
        position:'absolute',
        backgroundColor:'green',
        width:obstacleWidth,
        height: obstacleHeight,
        left:ObstaclesLeft,
        bottom :0 

    }}
     />
    </>
  )
}

export default Obstacles