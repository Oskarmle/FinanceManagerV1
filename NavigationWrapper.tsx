import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import * as SecureStore from "expo-secure-store";

// Screen imports
import Frontpage from "./screens/Frontpage";
import Category from "./screens/categories/Category";
import Entries from "./screens/entries/Entries";
import Signin from "./screens/users/Signin";
import { reloadJwtFromStorage } from "./user/userSlice";

export type RootStackParamList = {
  Entries: undefined;
  Category: undefined;
  Frontpage: undefined;
};

export type LoginSignupStackParamList = {
  Signin: undefined; // No parameters
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const SigninSignupStack = () => {
  const Stack = createNativeStackNavigator<LoginSignupStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

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
        name="Entries"
        component={Entries}
        options={{
          title: "Your entries",
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#BC7979" },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
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
        name="Entries"
        component={Entries}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Navigation = () => (
  <NavigationContainer>
    <HomeTabs />
  </NavigationContainer>
);

const LoginSignupScreens = () => (
  <NavigationContainer>
    <SigninSignupStack />
  </NavigationContainer>
);

export default function NavigationWrapper() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getValueFor() {
      const userObj = JSON.parse((await SecureStore.getItemAsync("jwt")) || "");
      console.log("userObj", userObj);
      dispatch(reloadJwtFromStorage(userObj));
    }
    getValueFor();
  }, []);

  return (
    <>
      {token ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <LoginSignupScreens />
        </>
      )}
    </>
  );
}
