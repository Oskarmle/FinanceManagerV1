import { View, Text, StyleSheet } from "react-native";
import CreateEntry from "../../components/CreateEntry";
import EntryList from "../../components/EntryList";

export default function Entries() {
  return (
    <View style={styles.entryContainer}>
      <CreateEntry />
      <EntryList />
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
