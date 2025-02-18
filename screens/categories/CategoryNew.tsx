import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React from "react";
import { CategoryEntity } from "../../category/CategoryEntity";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@env";
import axios from "axios";

type FormData = {
  category: string;
};

export default function CategoryNew() {
  const [category, setCategory] = React.useState("");

  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: (newCategory) => {
      return axios.post(`http://${API_URL}/categories`, newCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {
      console.error("Creating category failed", error);
    },
    onSuccess: () => {
      console.log("Category created successfully");
    },
  });

  const onAddCategory = () => {
    const data: FormData = { category: category };
    mutation.mutate(data);

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
