import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { Text } from "@react-native-material/core";
import Map from './components/Map';
import {URL, TOKEN} from "@env";

export default function App() {

  const [data, setData] = useState([]);
  const [development, setDevelopment] = useState([]);

  const getParkingLots = () => {
    fetch(URL, {
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
    <HideKeyboard>
    <View style={styles.container}>
      <Text variant="h4" style={{ margin: 16, marginBottom: 2, fontWeight: '600' }}>
        Parkie
      </Text>
      <StatusBar style="auto" />
      <Map data={data} devs={development} />
    </View>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 30
  },
});

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
