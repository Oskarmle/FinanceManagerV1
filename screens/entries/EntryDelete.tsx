import { View, Text, StyleSheet } from "react-native";

export default function EntryDelete() {
  return (
    <View style={styles.container}>
      <Text>EntryDelete</Text>
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
