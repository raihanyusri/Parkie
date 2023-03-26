import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState, useRef } from 'react';
import { SearchBar } from 'react-native-elements';
import LocationInfo from './LocationInfo';
import { ListItem } from "@react-native-material/core";

const Mapbox = (props) => {

    const [dataSelected, setDataSelected] = useState("");
    const [search, setSearch] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [lat, setLat] = useState(1.290270);
    const [longv, setLongv] = useState(103.851959);
    const mapRef = useRef()
    
    const markerClicked = (data) => {
      setDataSelected(data);
      setLat(parseFloat(data.Location.split(" ")[0]));
      setLongv(parseFloat(data.Location.split(" ")[1]));
      let x = parseFloat(data.Location.split(" ")[0]);
      let y = parseFloat(data.Location.split(" ")[1]);
      respositonMap(x,y);
    }

    const repositionMap = (x, y) => {
      mapRef?.current?.animateCamera({
        center: {
          latitude: x,
          longitude: y
        }
      });
    }

    const updateSearch = (search) => {
      setSearch(search);
      if (search.length > 0) {
        setSuggestions(props.devs.filter(dev => dev.toLowerCase().indexOf(search.toLowerCase()) > -1).splice(0,5));
      } else {
        setSuggestions("");
      }
    };

    const handlePress = (search) => {
      setSearch(toTitleCase(search));
      let searchedData = props.data.filter(d => d.Development.toString().toLowerCase() === search.toLowerCase());
      setDataSelected(searchedData[0]);
      setLat(parseFloat(searchedData[0].Location.split(" ")[0]));
      setLongv(parseFloat(searchedData[0].Location.split(" ")[1]));
      let x = parseFloat(searchedData[0].Location.split(" ")[0]);
      let y = parseFloat(searchedData[0].Location.split(" ")[1])
      repositionMap(x,y);
    }

    function toTitleCase(str) {
      const titleCase = str
      .toString()
        .toLowerCase()
        .split(' ')
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    
      return titleCase;
  }

    return (
      <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        placeholderTextColor="grey"
        color="black"
      />
      {suggestions.length > 0 ? suggestions.map((sug,i)=> 
      <ListItem button
        key={i} 
        title={toTitleCase(sug)}
        onPress={() => handlePress(sug)}
        >
      </ListItem>) : ""}
        <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followUserLocation={true}
        onUserLocationChange={event => console.log(event.nativeEvent)}
        initialRegion={{
          latitude: lat,
          longitude: longv,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}}
        style={{ height: '35%'}}
      >
      {props.data.map((data,i) => 
      <Marker key={i}
        coordinate={{
          latitude: parseFloat(data.Location.split(" ")[0]),
          longitude: parseFloat(data.Location.split(" ")[1])
        }}
        onPress={() => markerClicked(data)}
      />)} 
    </MapView>
    <LocationInfo key={dataSelected.CarParkID} data={dataSelected}/>
    </>
    )
}

export default Mapbox;