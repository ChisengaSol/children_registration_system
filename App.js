import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChildRegistrationForm from './screens/childRegistrationForm';
import ChildrenListView from './screens/ChildrenListView';
// import ChildDetails from './screens/childDetails';

const Drawer = createDrawerNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Children List" component = {ChildrenListView} />
                {/* <Drawer.Screen name="Child Details" component = {ChildDetails} /> */}
                <Drawer.Screen name="Add Child" component={ChildRegistrationForm} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}