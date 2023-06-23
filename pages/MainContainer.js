import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from './Saved';
import Home from './Home';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    const [data, setData] = useState([]);
    const [development, setDevelopment] = useState([]);

    const getParkingLots = () => {
        fetch('http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2', {
        method: "GET",
        headers: {
            AccountKey: 'IsKpAUqvSfe/sRU7BkpPQw=='
        }
        })
        .then(response => response.json())
        .then(data => {
            setData(data.value);
            const devs = data.value.map(d => d.Development);
            setDevelopment(devs);
        })
        .catch(error => ({ statusCode: 422, body: String(error) }));
    };

    useEffect(() => {
        getParkingLots();
    }, []);
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={'Parkie'}>
                    <Tab.Screen name={'Parkie'} children={() => <Home data={data} development={development}/>} />
                    <Tab.Screen name={'Saved'} children={() => <Saved data={data} development={development}/>}/>
                    
            </Tab.Navigator>
        </NavigationContainer>
    )
}