import React from 'react'
import { View,Image } from 'react-native'
import kimflap from '../assets/kimflap.png';


//App.js에서 설정한 새의 위치/추락 변수처리를 한것을 props를 구조분해
//const Bird({})내부에 집어넣고 사용함 굳이 상단에 app.js를 임포트하여 사용할 필요없다.
const Bird = ({BirdBottom,BirdLeft}) => {
    //새의 위치를 아래 div내 왼쪽으로 위치시키기 싫으므로
    //변수로 새의 위치를 중앙으로 재조정 
    const birdWidth = 80
    const birdHeight = 80

    return (
    <View style={{
        position:'absolute',
        // backgroundColor:'pink',
        //상단에 정해준 새 변수 할당
        width:birdWidth,
        height:birdHeight,
        //새의 위치를 아래 div내 왼쪽으로 위치시키기 싫으므로
        //변수로 새의 위치를 중앙으로 재조정 
        left: BirdLeft - (birdWidth / 2),
        bottom: BirdBottom - (birdHeight /2)     
    }}>
        <Image style={{
    width:115,height:birdHeight, borderRadius:200,}}source={kimflap}/>
    </View>
  )
}


export default Bird