import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from './Saved';
import Home from './Home';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { TOKEN, CARPARK_URL } from '@env';

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    const [data, setData] = useState([]);
    const [development, setDevelopment] = useState([]);

    const getParkingLots = () => {
        fetch(CARPARK_URL, {
            method: "GET",
            headers: {
                AccountKey: TOKEN
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
                initialRouteName={'Parkie'}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === 'Parkie') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else {
                            iconName = focused ? 'bookmark' : 'bookmark-outline';
                        }

                        return <Icon
                            name={iconName}
                            type='ionicon'
                            color={color}
                            size={size} 
                        />
                    },
                    tabBarActiveTintColor:'green',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { fontSize: 12},
                    tabBarStyle: { padding: 5, height: 85 }
                })}
                >
                    <Tab.Screen name={'Parkie'} children={() => <Home data={data} development={development}/>} />
                    <Tab.Screen name={'Saved'} children={() => <Saved data={data} development={development}/>}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}