import { Button, Text, ListItem } from "@react-native-material/core";
import { useState, useEffect } from "react";

const LocationInfo = (props) => {

    const [development, setDevelopment] = useState();
    const [lots, setLots] = useState();

    useEffect(() => {
        setDevelopment(props.data.Development);
        setLots(props.data.AvailableLots);
    });

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
            <Text style={{ marginTop: 20, fontSize: 22, fontWeight: '600' }}>
                {development ? toTitleCase(props.data.Development) : "Tap a marker or search for a carpark!"}
            </Text>

            {development ? 
            <Text style={{ fontSize: 16, fontWeight: '400'}}>{'\n'}Available Lots: 
            <Text style={{ fontSize: 20, fontWeight: '800', color: (lots < 15 ? "red" : lots < 50 ? "orange" : "green")}}>
                {lots ? " " + lots : " Information not available"}{'\n'}
            </Text>
            </Text> : 
            ""}
        </>
    )
}

export default LocationInfo;