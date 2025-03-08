import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "@env";

type FormData = {
  category: string;
};

export default function CreateCategory() {
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

  const handleAddCategory = () => {
    const data: FormData = { category: category };
    mutation.mutate(data);
    console.log("Add category");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Add a new category</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Category name"
          onChangeText={setCategory}
          value={category}
        />
      </View>
      <TouchableOpacity onPress={handleAddCategory}>
        <View>
          <Text style={styles.button}>Add category</Text>
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
  header: {
    backgroundColor: "#7994BC",
    padding: 12,
    color: "#F4F4F4",
    fontSize: 16,
  },
  label: {
    color: "#707070",
    fontSize: 15,
  },
  content: {
    padding: 12,
  },
  input: {
    height: 40,
    padding: 10,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: "#DADADA",
  },
  button: {
    fontSize: 16,
    color: "#4E4667",
    textDecorationLine: "underline",
    paddingLeft: 12,
    marginBottom: 12,
  },
});
