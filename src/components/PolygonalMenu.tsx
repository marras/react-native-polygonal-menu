import React, { ReactNode, useCallback, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import _ from 'lodash'
import { PolygonalImage } from './PolygonalImage'

type PolygonalMenuProps = {
  regions: Regions
  highlightedRegions: Record<string, any>
  backgroundImage: ImageSourcePropType
  height?: number
  width?: number
  overlayStyle?: ViewStyle
  children?: ReactNode
  onSelectRegion?: (region: string) => void
}

export const PolygonalMenu = ({
  regions,
  highlightedRegions,
  backgroundImage,
  height,
  width,
  overlayStyle,
  children,
  onSelectRegion,
}: PolygonalMenuProps) => {
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleClick = useCallback((region) => {
    setSelectedRegion(region)
    if (onSelectRegion) onSelectRegion(region)
  }, [])

  const finalOverlayStyle = [
    styles.overlay,
    height ? { height } : {},
    width ? { width } : {},
    overlayStyle,
  ]

  return (
    <PolygonalImage
      onClick={handleClick}
      image={backgroundImage}
      availableRegions={regions}
      imageHeight={height}
      imageWidth={width}
    >
      {selectedRegion && (
        <Image
          source={highlightedRegions[selectedRegion]}
          style={{ zIndex: 5, flex: 1 }}
          width={width}
          resizeMode='cover'
        />
      )}
      <View style={finalOverlayStyle}>{children}</View>
    </PolygonalImage>
  )
}

const styles = StyleSheet.create({
  overlay: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
})
