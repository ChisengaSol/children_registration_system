import "setimmediate"

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChildRegistrationForm from './screens/childRegistrationForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisteredChildren from "./screens/registeredChildren";

const Stack = createNativeStackNavigator()

// export default function App() {
//   return (
    
    
//       <ChildRegistrationForm />
    
    

//   );
// }



export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}
      <Stack.Navigator initialRouteName="RegisteredChildren">
        <Stack.Screen name="ChildRegistrationForm" component={ChildRegistrationForm}/>
        <Stack.Screen name="RegisteredChildren" component={RegisteredChildren}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
