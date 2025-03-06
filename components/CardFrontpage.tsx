import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type CardFrontpageProps = {
  title: string;
  description: string;
  handleOnPress: () => void;
  style: "finances" | "categories" | "entries";
};

export default function CardFrontpage({
  title,
  description,
  handleOnPress,
  style,
}: CardFrontpageProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleOnPress}>
        <View style={[styles.header, styles[style]]}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.linkText}>See more</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 390,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  finances: {
    backgroundColor: "#79BC93",
  },
  entries: {
    backgroundColor: "#BC7979",
  },
  categories: {
    backgroundColor: "#7994BC",
  },
  header: {
    padding: 12,
  },
  headerText: {
    color: "#F4F4F4",
    fontSize: 16,
  },
  content: {
    padding: 12,
  },
  description: {
    fontSize: 14,
    color: "#707070",
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4E4667",
    textDecorationLine: "underline",
  },
});
