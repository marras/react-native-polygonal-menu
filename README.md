# React Native Polygonal Menu

### Display and handle clicks on menus composed of non-rectangular buttons

![](docs/usage.gif)

#### Installation

`npm i react-native-polygonal-menu`

#### Basic usage

1. Select images
   - **Background**: this is the main image composed of different clickable
     sections
   - [OPTIONAL] **Highlighted sections** (transparent PNGs with only the
     highlighted sections) - must be same size as the original image
2. Using a graphics tool (e.g. GIMP), determine the edges of the polygonal
   buttons in your menu and store them as array of vertices (see
   `examples/assets/mainRegions.json`

   NOTE: the coordinates of the vertices should be given in the units of the original image (pixels).

3. Insert the `<PolygonalMenu>` component into your app

```typescript
<PolygonalMenu
  regions={mainScreenRegions}
  backgroundImage={require('../assets/main-background.png')}
  onSelectRegion={handleSelect}
>
  // Insert any overlaying elements here...
</PolygonalMenu>
```

After a user clicks on a region, its name will be returned in the `onSelectRegion`
callback.

Photos from Pexels: city - Maxime Francis, forest - Matthew Montrone, lake - Bri Schneiter.
