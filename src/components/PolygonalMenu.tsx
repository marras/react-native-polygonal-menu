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
  selectedRegion?: R
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
  selectedRegion: externalSelectedRegion,
}: PolygonalMenuProps<R>) => {
  const [selectedRegion, setSelectedRegion] = useState(externalSelectedRegion)

  const actualRegion =
    externalSelectedRegion === undefined
      ? selectedRegion
      : externalSelectedRegion

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
      {actualRegion && highlightedRegions && (
        <Image
          source={highlightedRegions[actualRegion]}
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
    height: '100%',
    width: '100%',
    zIndex: 5,
  },
})
