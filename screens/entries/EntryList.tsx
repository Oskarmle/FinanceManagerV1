import { View, Text, StyleSheet } from "react-native";

export default function EntryList() {
  return (
    <View style={styles.container}>
      <Text>EntryList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
