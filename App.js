import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChildRegistrationForm from './screens/childRegistrationForm';
import ChildrenListView from './screens/ChildrenListView';
import ChildDetails from './screens/childDetails';


const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="ChildrenList" component={ChildrenListView} options={
                    { title: "Children's List" }

                } />
                <Drawer.Screen name="AddChild" component={ChildRegistrationForm} options={
                    { title: "Register Child" }

                } />
                <Drawer.Screen name="ChildDetails" component={ChildDetails}
                    options={{ drawerLabel: () => null, title: "Child's Details" }} // Set drawerLabel to null to hide from the drawer
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}