import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import TodoList from "./TodoList";
import { TodoEntity } from "./TodoEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@env";

type FormData = {
  todo: string;
};

export default function Todo() {
  const [todos, setTodos] = React.useState([] as TodoEntity[]);
  const [todo, setTodo] = React.useState("");

  const toggleTodoCompletion = (id: number) => {
    setTodos((checkTodos) =>
      checkTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Post new todo
  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: (newToto) => {
      return axios.post(`http://${API_URL}/categories`, newToto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {
      console.error("Created todo failed", error);
    },
    onSuccess: () => {
      console.log("Created todo successfully");
      setTodo("");
      fetchTodos();
    },
  });

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://${API_URL}/categories`);
      setTodos(response.data); // Set the fetched todos
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const onAddTodo = () => {
    const data: FormData = { todo: todo };
    mutation.mutate(data);
    // console.log(API_URL);
  };

  return (
    <View style={styles.todoContainer}>
      <Text>Todo</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTodo}
        value={todo}
        placeholder="useless placeholder"
      />
      <Button
        onPress={onAddTodo}
        title="Add todo"
        color="#841584"
        accessibilityLabel="Add todo"
      />
      <FlatList
        style={styles.todoList}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoList
            todoItem={item}
            toggleTodoCompletion={toggleTodoCompletion}
          ></TodoList>
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
