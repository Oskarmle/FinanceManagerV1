import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesAPI } from "../../APIs/CategoryAPI";
import { CategoryEntity } from "../../category/CategoryEntity";
import CreateCategory from "../../components/CreateCategory";
import CategoryList from "../../components/CategoryList";

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

  const handleDeleteCategory = (id: number) => {
    CategoriesAPI.deleteCategory(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.CategoryContainer}>
      <CreateCategory />
      <CategoryList></CategoryList>
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
