import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { CategoryEntity } from "../../category/CategoryEntity";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { createCategory } from "../../category/categorySlice";

type FormData = {
  category: string;
};

export default function CategoryNew() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const onAddCategory = () => {
    console.log("Add category");
    const newCategory = new CategoryEntity(category);
    dispatch(createCategory(newCategory));
  };

  return (
    <View style={styles.todoContainer}>
      <Text>Category</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCategory}
        value={category}
        placeholder="useless placeholder"
      />
      <Button
        onPress={onAddCategory}
        title="Add todo"
        color="#841584"
        accessibilityLabel="Add todo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  todoList: {
    marginTop: 20,
    gap: 10,
  },
});
