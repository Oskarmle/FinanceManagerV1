import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CategoryEntity } from "./CategoryEntity";

export type CategoryListProps = {
  categoryItem: CategoryEntity;
  toggleCategoryCompletion: (id: number) => void;
};

export default function CategoryListItem({
  categoryItem,
  toggleCategoryCompletion,
}: CategoryListProps) {
  const onCategoryPress = () => {
    toggleCategoryCompletion(categoryItem.id);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.category,
          categoryItem.completed && styles.completedCategory,
        ]} onPress={onCategoryPress}
      >
        <Text style={styles.categoryText}>{categoryItem.category}</Text>
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
  completedCategory: {
    color: "white",
    backgroundColor: "green",
  },
  categoryText: {
    color: "white",
  },
});
