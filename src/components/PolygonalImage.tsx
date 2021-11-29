import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native'
import _ from 'lodash'

const findIntersection = (p1: Point, p2: Point, y: number) => {
  if ((p1.y < y && p2.y < y) || (p1.y > y && p2.y > y)) {
    return undefined
  } else {
    if (p1.x === p2.x) return p1.x //vertical line intersects @ x-value

    // Otherwise calculate the x of intersection point where ax+b = y
    const a = (p2.y - p1.y) / (p2.x - p1.x)
    const b = p1.y - a * p1.x

    return (y - b) / a
  }
}

const isPointInsideRegion = (
  points: ReadonlyArray<Point>,
  x: number,
  y: number
) => {
  const pointPairs: Array<[Point, Point]> = []
  for (let i = 0; i < points.length - 1; i++) {
    pointPairs.push([points[i], points[i + 1]])
  }

  pointPairs.push([points[points.length - 1], points[0]])

  const intersections = _.without(
    pointPairs.map(([p1, p2]) => findIntersection(p1, p2, y)),
    undefined
  ) as number[]

  intersections.push(x)
  const sorted = intersections.sort((a, b) => a - b) // plain sort() would sort alphabetically
  const index = sorted.findIndex((i) => i === x)
  return index % 2 === 1
}

const detectRegion = (regions: Regions, coordX: number, coordY: number) => {
  const matches = _.map(
    regions,
    (region: ReadonlyArray<Point>, name: string) => {
      return isPointInsideRegion(region, coordX, coordY) ? name : null
    }
  )
  return _.compact(matches)[0] || '_notFound'
}

type PolygonalImageProps = {
  onClick: (clickedRegion: string) => void
  image: ImageSourcePropType
  availableRegions: Record<string, ReadonlyArray<Point>>
  imageHeight?: number
  imageWidth?: number
  children?: ReactNode
}

export const PolygonalImage = ({
  onClick,
  image,
  availableRegions,
  imageHeight,
  imageWidth,
  children,
}: PolygonalImageProps) => {
  const [renderedDims, setRenderedDims] = useState({ width: 0, height: 0 })

  const { width: imgWidth, height: imgHeight } = useMemo(
    () => Image.resolveAssetSource(image),
    []
  )

  const height = imageHeight || renderedDims.height
  const width = imageWidth || renderedDims.width

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height, x, y } = e.nativeEvent.layout
      setRenderedDims({ width, height })
    },
    [setRenderedDims]
  )

  // Show a warning if the rendered image is wider than the original
  // (i.e. the image is cropped vertically). TODO: use a different region detection
  // algorithm in that case!
  useEffect(() => {
    if (width / height > imgWidth / imgHeight) {
      console.warn(
        '[ERROR] PolygonalImage: rendered image width/height ratio of',
        (width / height).toFixed(2),
        'exceeds the actual image proportions of',
        (imgWidth / imgHeight).toFixed(2),
        '. This may lead to incorrect click region detection!'
      )
    }
  }, [height, width, imgHeight, imgWidth])

  const handleClick = useCallback(
    (e) => {
      const { locationX: x, locationY: y } = e.nativeEvent
      const scale = imgHeight / height
      const horizMargin = (imgWidth - width * scale) / 2 // obustronny

      const coordX = horizMargin + x * scale
      const coordY = y * scale

      onClick(detectRegion(availableRegions, coordX, coordY))
    },
    [height, width, imgHeight, imgWidth, availableRegions]
  )

  const containerStyle =
    imageHeight || imageWidth ? { height, width } : { flex: 1 }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={handleClick}
        style={{ flex: 1 }}
        activeOpacity={1}
      >
        <ImageBackground
          source={image}
          resizeMode='cover'
          style={styles.image}
          onLayout={handleLayout}
        >
          {children}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#000' },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})
