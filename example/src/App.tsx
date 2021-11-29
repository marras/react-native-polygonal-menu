import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import PolygonalMenu from 'react-native-polygonal-menu'

import mainScreenRegions from '../assets/mainRegions.json'

const HIGHLIGHTED_IMGS = {
  forest: require('../assets/forest_high.png'),
  lake: require('../assets/lake_high.png'),
  city: require('../assets/city_high.png'),
}

export const App = () => {
  const handleSelect = (region: string) => {
    console.log('SELECTED REGION:', region)
  }

  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <PolygonalMenu
      regions={mainScreenRegions}
      highlightedRegions={HIGHLIGHTED_IMGS}
      backgroundImage={require('../assets/all_gray.png')}
      overlayStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      height={500}
      onSelectRegion={handleSelect}
    >
      <TouchableOpacity onPress={handleClick}>
        <View style={{ width: 20, height: 20, backgroundColor: '#6bf' }}>
          <Text>Clicking this button</Text>
          <Text>doesn't select a region</Text>
        </View>
      </TouchableOpacity>
    </PolygonalMenu>
  )
}

export default App
