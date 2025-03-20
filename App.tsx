import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavigationWrapper from "./NavigationWrapper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <NavigationWrapper />
          {/* <MyTabs /> */}
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}
