import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CategoryEntity } from "./CategoryEntity";

export type CategoryListProps = {
  CategoryItem: CategoryEntity;
};

export default function CategoryListItem({ CategoryItem }: CategoryListProps) {
  return (
    <View>
      <TouchableOpacity style={[styles.category]}>
        <Text style={styles.categoryText}>{CategoryItem.category}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    color: "#ffffff",
    backgroundColor: "red",
    marginBottom: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
  },
  categoryText: {
    color: "white",
  },
});
