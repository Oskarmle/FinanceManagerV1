import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CategoryListItem from "../../category/CategoryListItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCategories } from "../../category/categorySlice";

export default function CategoryNew() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCreateCategoryPress = () => {
    navigation.navigate("CategoryNew");
  };

  // Redux stuff
  const categories = useSelector((state: RootState) => state.category.categories);
  const dispatch = useDispatch<AppDispatch>();
  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <View style={styles.CategoryContainer}>
      <Text>Categories</Text>
      <FlatList
        style={styles.CategoryList}
        data={categories}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        renderItem={({ item }) => (
          <CategoryListItem categoryItem={item}></CategoryListItem>
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
