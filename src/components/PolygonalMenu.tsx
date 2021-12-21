import React, { ReactNode, useCallback, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { Regions } from '../types'
import { PolygonalImage } from './PolygonalImage'

type PolygonalMenuProps<R extends string> = {
  regions: Regions
  highlightedRegions?: Record<R, any>
  backgroundImage: ImageSourcePropType
  height?: number
  width?: number
  overlayStyle?: ViewStyle
  children?: ReactNode
  onSelectRegion?: (region: R) => void
}

export const PolygonalMenu = <R extends string>({
  regions,
  highlightedRegions,
  backgroundImage,
  height,
  width,
  overlayStyle,
  children,
  onSelectRegion,
}: PolygonalMenuProps<R>) => {
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleClick = useCallback(
    (region) => {
      setSelectedRegion(region)
      if (onSelectRegion) onSelectRegion(region)
    },
    [onSelectRegion]
  )

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
          style={styles.highlightedImage}
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
  highlightedImage: {
    flex: 1,
    zIndex: 5,
  },
})
