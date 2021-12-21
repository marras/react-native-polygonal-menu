import React, { useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import PolygonalMenu from 'react-native-polygonal-menu'

import mainScreenRegions from './regions'

const HIGHLIGHTED_IMGS = {
  forest: require('../assets/forest_high.png'),
  lake: require('../assets/lake_high.png'),
  city: require('../assets/city_high.png'),
}

type AvailableRegions = keyof typeof HIGHLIGHTED_IMGS

export const App = () => {
  const handleSelect = (region: AvailableRegions) => {
    console.log('SELECTED REGION:', region)
    setSelectedRegion(region)
  }

  const handleClick = () => {
    console.log('Button clicked!')
  }

  // Start with a pre-selected city region
  const [selectedRegion, setSelectedRegion] = useState<AvailableRegions>('city')

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PolygonalMenu
          regions={mainScreenRegions}
          highlightedRegions={HIGHLIGHTED_IMGS}
          backgroundImage={require('../assets/all_gray.png')}
          overlayStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          height={500}
          width={300}
          onSelectRegion={handleSelect}
          selectedRegion={selectedRegion}
        >
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.overlayButton}>
              <Text>Clicking this button</Text>
              <Text>doesn't select a region</Text>
            </View>
          </TouchableOpacity>
        </PolygonalMenu>
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlayButton: { backgroundColor: '#6bf' },
})
