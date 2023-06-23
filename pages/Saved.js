import { ScrollView, View, Text, StyleSheet, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toTitleCase } from "./utils/utils";

export default function Saved(props) {

    const [saved, setSaved] = useState();

    const styles = StyleSheet.create({
        mainCardView: {
          height: 75,
          width: '92.5%',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 20,
          shadowColor: 'grey',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.4,
          shadowRadius: 2,
          elevation: 8,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 12,
          margin: 15,
          marginTop: 0
        }
    })

    const getData = async () => {
        try {
            const value = await AsyncStorage.getAllKeys();
            if (value !== null) {
                setSaved(value);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getLotsForLocation = (location) => {
        const locationObj = props.data.filter(data => data.Development.toLowerCase() === location.toLowerCase());
        return locationObj ? locationObj[0]?.AvailableLots :  "NA";
    }

    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            getData()
            return true;
        } catch (e) {
            return false;
        }
    }
    
    useEffect(() => {
        getData();
    }, [])

    return (
        <ScrollView
            refreshControl={<RefreshControl onRefresh={getData} />}>
            <View style={{ marginTop: 20 }}>
                {saved?.map(locationSaved => 
                <View style={styles.mainCardView}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{toTitleCase(locationSaved)}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>
                    <Text style={{ paddingTop: 5, fontSize: 16, fontWeight: '700', color: (getLotsForLocation(locationSaved) < 15 ? "red" : getLotsForLocation(locationSaved) < 50 ? "orange" : "green")}}>
                        {getLotsForLocation(locationSaved) ? getLotsForLocation(locationSaved) : "Information not available"}{'\n'}
                    </Text>
                    <Text 
                        style={{ marginLeft: 'auto', color: 'red', paddingTop: 5 }}
                        onPress={() => {removeData(locationSaved)}}>Remove</Text>
                    </View>
                </View>)}
            </View>
        </ScrollView>
    )
}