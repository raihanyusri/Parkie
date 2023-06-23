import { Button, Text, ListItem } from "@react-native-material/core";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toTitleCase } from "../pages/utils/utils";

const LocationInfo = (props) => {

    const [development, setDevelopment] = useState();
    const [isFavourited, setIsFavourited] = useState(false);
    const [lots, setLots] = useState();

    const styles = StyleSheet.create({
        mainCardView: {
          height: 150,
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
          paddingLeft: 16,
          paddingRight: 14,
          margin: 15,
          marginTop: 20
        }
    })

    useEffect(() => {
        setDevelopment(props.data.Development);
        setLots(props.data.AvailableLots);
        isSaved(props.data.Development);
    });

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem(value, value);
          getData()
        } catch (e) {
          console.error(e)
        }
      };
  
    const getData = async () => {
        try {
            const value = await AsyncStorage.getAllKeys();
            return value;
        } catch (e) {
            console.error(e);
        }
    };

      const isSaved = async (development) => {
        try {
            const value = await AsyncStorage.getItem(development);
            if (value !== null) {
                setIsFavourited(true);
            } else {
                setIsFavourited(false);
            }
          } catch (e) {
            console.error(e)
          }
      }

      const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
    
      const handlePress = () => {
        if (!isFavourited) {
            storeData(props.data.Development, props.data.Development);
            setIsFavourited(true);
        } else {
            removeData(props.data.Development);
            setIsFavourited(false);
        }
        getData();
      }
    
    return (
        <View style={styles.mainCardView}>
            <Text style={{ marginTop: 15, fontSize: development ? 18 : 22, fontWeight: development ? '400' : '600'}}>
                {development ? "Location:" : "Tap a marker or search for a carpark!"}
            </Text>

            <Text style={{ fontSize: 22, fontWeight: '600' }}>
                {development ? toTitleCase(props.data.Development) : ""}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                {development ? 
                <Text style={{ fontSize: 18, fontWeight: '400'}}>{'\n'}Available Lots: 
                    <Text style={{ fontSize: 20, fontWeight: '800', color: (lots < 15 ? "red" : lots < 50 ? "orange" : "green")}}>
                        {lots ? " " + lots : " Information not available"}{'\n'}
                    </Text>
                </Text> : 
                ""}
                {development ?
                <Icon
                    name={isFavourited ? 'heart' : 'heart-outline'}
                    type='ionicon'
                    color='grey'
                    size={25}
                    onPress={handlePress}
                    style={{ marginTop: 'auto', marginBottom: 20}}
                /> : ""}
            </View>
        </View>
    )
}

export default LocationInfo;