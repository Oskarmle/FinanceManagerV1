import { StatusBar } from "expo-status-bar";
import EntryList from "./screens/entries/EntryList";
import EntryEdit from "./screens/entries/EntryEdit";
import EntryDelete from "./screens/entries/EntryDelete";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryNew from "./screens/categories/CategoryNew";
import CategoryList from "./screens/categories/CategoryList";
import Frontpage from "./screens/Frontpage";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

const queryClient = new QueryClient();

export type RootStackParamList = {
  EntryList: undefined;
  EntryEdit: undefined;
  EntryDelete: undefined;
  CategoryList: undefined;
  CategoryNew: undefined;
  Frontpage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

function EntryListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EntryList" component={EntryList} />
      <Stack.Screen name="EntryEdit" component={EntryEdit} />
      <Stack.Screen name="EntryDelete" component={EntryDelete} />
    </Stack.Navigator>
  );
}
function CategoryListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="CategoryNew" component={CategoryNew} />
    </Stack.Navigator>
  );
}

function HomepageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Frontpage"
        component={Frontpage}
        options={{
          title: "Homepage",
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="EntryList"
        component={EntryListStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryListStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "shift",
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "black" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomepageStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={EntryList}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MyTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
