import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChildRegistrationForm from './screens/childRegistrationForm';

export default function App() {
  return (
    
    
      <ChildRegistrationForm />
    
    

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
