import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesAPI } from "../../APIs/CategoryAPI";
import { CategoryEntity } from "../../category/CategoryEntity";
import CategoryListItem from "../../category/CategoryListItem";

export default function CategoryNew() {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.todoContainer}>
      <Text>Category</Text>
      <FlatList
        style={styles.todoList}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryListItem CategoryItem={item}></CategoryListItem>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  todoContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 80,
  },
  todoList: {
    marginTop: 20,
    gap: 10,
  },
});
