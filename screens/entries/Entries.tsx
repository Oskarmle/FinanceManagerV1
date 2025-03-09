import { View, Text, StyleSheet } from "react-native";
import CreateEntry from "../../components/CreateEntry";

export default function Entries() {
  return (
    <View style={styles.entryContainer}>
      <CreateEntry />
    </View>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 20,
    gap: 20,
  },
});
