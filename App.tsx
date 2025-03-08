import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screen imports
import Frontpage from "./screens/Frontpage";
import Category from "./screens/categories/Category";
import EntryDelete from "./screens/entries/EntryDelete";
import EntryList from "./screens/entries/EntryList";
import EntryEdit from "./screens/entries/EntryEdit";

const queryClient = new QueryClient();

export type RootStackParamList = {
  EntryList: undefined;
  EntryEdit: undefined;
  EntryDelete: undefined;
  Category: undefined;
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

function HomepageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Frontpage"
        component={Frontpage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: "Categories",
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#7994BC" },
        }}
      />
      <Stack.Screen
        name="EntryList"
        component={EntryList}
        options={{ headerShown: false, title: "Entries" }}
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
        tabBarActiveTintColor: "#4E4667",
        tabBarInactiveTintColor: "#4E4667",
        tabBarStyle: { backgroundColor: "white" },
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
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="List"
        component={EntryListStack}
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
