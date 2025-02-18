import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

export default function Frontpage() {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "EntryList"
  >;
  const navigation = useNavigation<NavigationProp>();
  const handleEntriesPress = () => {
    navigation.navigate("EntryList");
  };
  const handleCategoriesPress = () => {
    navigation.navigate("CategoryList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.CategoryContainer}>
        <Text>Click to see and add categories</Text>
        <Button title="Categories" onPress={handleCategoriesPress}></Button>
      </View>
      <View style={styles.EntryContainer}>
        <Text>Click to see and add entries</Text>
        <Button title="Entries" onPress={handleEntriesPress}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CategoryContainer: {
    marginBottom: 20,
  },
  EntryContainer: {},
});
