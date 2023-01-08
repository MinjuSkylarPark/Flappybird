import { View, Text, ImageBackground,StyleSheet } from 'react-native'
import React from 'react'

//장애물로 사용할 컴포넌트를 아예 하나 만들어줌

//const styles =StyleSheet.create 쓰는 거랑 파베이미지 uri - url이라고 바꿔쓰지않는거 
const column1={uri:'https://firebasestorage.googleapis.com/v0/b/cookie-32b62.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-01-08%2002.46.12.png?alt=media&token=dc594c24-90ab-4657-92a9-eee1e5193498'}
const column2={uri:'https://firebasestorage.googleapis.com/v0/b/cookie-32b62.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-01-09%2000.32.20.png?alt=media&token=20d00d35-9fc7-43c7-8e8f-d763ff37f344'}

const Obstacles= ({
    ObstaclesLeft,
    obstacleWidth,
    obstacleHeight,
    gap,
    color,
randomBottom}) => {
  
  //장애물 사이즈 설정
    return (
    <>

    {/* 장애물의 색깔/크기/화면내 위치설정 플래피버드는 움직이는 미로같은거라 뷰 두개*/}
    
    <View style={{
        position:'absolute',
        backgroundColor:color,
        width:obstacleWidth,
        height: obstacleHeight,
        left:ObstaclesLeft,
        // bottom :0 + obstacleHeight + gap,
        bottom : randomBottom + obstacleHeight + gap,
    }}
     >
        <ImageBackground source={column1} resizeMode="cover" style={styles.columns}/>
   
     </View>
     
    {/* 장애물의 색깔/크기/화면내 위치설정 플래피버드는 움직이는 미로같은거라 뷰 두개*/}
    <View style={{
        position:'absolute',
        backgroundColor:color,
        width:obstacleWidth,
        height: obstacleHeight,
        left:ObstaclesLeft,
        bottom : randomBottom

    }}>
        <ImageBackground source={column2} resizeMode="cover" style={styles.columns}/>

    </View>
     
    </>
  )
}

const styles= StyleSheet.create({
    columns:{
        flex:1,
    }

})

export default Obstacles