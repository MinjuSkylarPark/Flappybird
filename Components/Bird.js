import React from 'react'
import { View,Image } from 'react-native'

const bird ={uri :'https://firebasestorage.googleapis.com/v0/b/cookie-32b62.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-01-09%2000.33.35.png?alt=media&token=fa939fed-161e-4ee7-9799-709fa5fc3e98'}

//App.js에서 설정한 새의 위치/추락 변수처리를 한것을 props를 구조분해
//const Bird({})내부에 집어넣고 사용함 굳이 상단에 app.js를 임포트하여 사용할 필요없다.
const Bird = ({BirdBottom,BirdLeft}) => {
    //새의 위치를 아래 div내 왼쪽으로 위치시키기 싫으므로
    //변수로 새의 위치를 중앙으로 재조정 
    const birdWidth = 70
    const birdHeight = 70

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
             width:100,
             height:birdHeight, 
             borderRadius:10}}
             source={bird}/>
     </View>
  )
}


export default Bird