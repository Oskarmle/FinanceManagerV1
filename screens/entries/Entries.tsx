import { View, Text, StyleSheet } from "react-native";
import CreateEntry from "../../components/CreateEntry";
import EntryList from "../../components/EntryList";
import { ScrollView } from "react-native-gesture-handler";

export default function Entries() {
  return (
    <ScrollView contentContainerStyle={styles.entryContainer}>
      <CreateEntry />
      <EntryList />
    </ScrollView>
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
