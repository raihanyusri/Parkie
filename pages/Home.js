import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Map from '../components/Map'

export default function Home(props) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fbfbfb'
    },
  });
  
  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Map data={props.data} devs={props.development} />
      </View>
    </HideKeyboard>
  );
}
