import { StatusBar } from "expo-status-bar";
import EntryList from "./screens/entries/EntryList";
import EntryEdit from "./screens/entries/EntryEdit";
import EntryDelete from "./screens/entries/EntryDelete";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryNew from "./screens/categories/CategoryNew";

const queryClient = new QueryClient();

export type RootStackParamList = {
  EntryList: undefined;
  EntryEdit: undefined;
  EntryDelete: undefined;
  CategoryList: undefined;
  CategoryNew: undefined;
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

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={EntryListStack} />
      <Tab.Screen name="New" component={CategoryNew} />
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
