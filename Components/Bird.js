import React from 'react'
import { View } from 'react-native'


const Bird = ({BirdBottom,BirdLeft}) => {
    const birdWidth = 50
    const birdHeight = 60

    return (
    <View style={{
        position:'absolute',
        backgroundColor:'pink',
        width:birdWidth,
        height:birdHeight,
        bottom: BirdBottom - (birdHeight /2),
        left: BirdLeft - (birdWidth / 2),
       
    }}/>
  )
}


export default Bird