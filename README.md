# React Native Polygonal Menu

### Display and handle clicks on menus comnposed of non-rectangular buttons

#### Installation

`npm i react-native-polygonal-menu`

#### How to use

1. Select images
    - **Background**: this is the main image composed of different clickable
      sections
    - [OPTIONAL] **Highlighted sections** (transparent PNGs with only the
      highlighted sections) - must be same size as the original image
2. Using a graphics tool (e.g. GIMP), determine the edges of the polygonal
   buttons in your menu and store them as array of vertices (see
   `examples/assets/mainRegions.json`
3. Insert the `<PolygonalMenu>` component into your app

``` typescript
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
