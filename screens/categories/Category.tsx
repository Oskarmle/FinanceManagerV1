import { View, StyleSheet } from "react-native";
import React from "react";
import CreateCategory from "../../components/CreateCategory";
import CategoryList from "../../components/CategoryList";

export default function CategoryNew() {
  return (
    <View style={styles.CategoryContainer}>
      <CreateCategory />
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
  },
  CategoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 20,
    gap: 20,
  },
  CategoryList: {
    marginTop: 20,
    gap: 10,
  },
});
