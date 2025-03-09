import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import CardFrontpage from "../components/CardFrontpage";

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

  return (
    <View style={styles.container}>
      <View style={styles.explainContainer}>
        <Text style={styles.title}>Wecome back Oskar</Text>
        <Text style={styles.description}>
          Total spent this month is "missing" and the category with the largest
          spent is "missing"
        </Text>
      </View>
      <CardFrontpage
        description="Get a report of your spendings based on your entries and categories."
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
  description: {
    color: "#4E4667",
    fontSize: 22,
  },
});
