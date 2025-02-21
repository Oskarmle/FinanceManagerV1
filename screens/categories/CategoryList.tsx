import { View, Text, StyleSheet, FlatList, Button } from "react-native";
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

  //Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  //Navigate to the CategoryNew screen
  const handleCreateCategoryPress = () => {
    navigation.navigate("CategoryNew");
  };

  const handleDeleteCategory = (id: number) => {
    CategoriesAPI.deleteCategory(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.CategoryContainer}>
      <Text>Categories</Text>
      <FlatList
        style={styles.CategoryList}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryListItem
            categoryItem={item}
            deleteCategory={handleDeleteCategory}
          />
        )}
      ></FlatList>
      <View style={styles.CreateCategoryContainer}>
        <Text>Click to see and add Categories</Text>
        <Button
          title="Create category"
          onPress={handleCreateCategoryPress}
        ></Button>
      </View>
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
  CategoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 80,
  },
  CategoryList: {
    marginTop: 20,
    gap: 10,
  },
  CreateCategoryContainer: {},
});
