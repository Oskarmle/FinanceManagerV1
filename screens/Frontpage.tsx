import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../NavigationWrapper";
import { useNavigation } from "@react-navigation/native";
import CardFrontpage from "../components/CardFrontpage";
import { UsersAPI } from "../APIs/UserAPI";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Frontpage() {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Entries"
  >;
  const navigation = useNavigation<NavigationProp>();
  const handleEntriesPress = () => {
    navigation.navigate("Entries");
  };
  const handleCategoriesPress = () => {
    navigation.navigate("Category");
  };

  const handleFinancesPress = () => {
    console.log("Finances");
  };

  const [user, setUser] = React.useState<{ username: string } | null>(null);
  const token = useSelector((state: RootState) => state.user.token);


  const fetchUser = async () => {
    try {
      const response = await UsersAPI.getUser(token);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.explainContainer}>
        <Text style={styles.title}>Welcome back {user?.username}</Text>
      </View>
      <CardFrontpage
        description="Get a report of your spending based on your entries and categories."
        title="Your finances"
        handleOnPress={handleFinancesPress}
        style="finances"
      />
      <CardFrontpage
        description="See all your entries, and add/delete entries"
        title="Your entries"
        handleOnPress={handleEntriesPress}
        style="entries"
      />
      <CardFrontpage
        description="Create new categories, see entries based on categories, and delete existing categories."
        title="Your categories"
        handleOnPress={handleCategoriesPress}
        style="categories"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: 60,
  },
  CategoryContainer: {
    marginBottom: 20,
  },
  explainContainer: {
    width: 390,
  },
  title: {
    color: "#4E4667",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
