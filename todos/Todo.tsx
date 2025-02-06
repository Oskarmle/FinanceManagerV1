import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import React from "react";
import TodoList from "./TodoList";
import { TodoEntity } from "./TodoEntity";

export default function Todo() {
  const [todos, setTodos] = React.useState([] as TodoEntity[]);
  const [todo, setTodo] = React.useState("");

  const onAddTodo = () => {
    const newTodo = new TodoEntity(todos.length, todo);
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos((checkTodos) =>
      checkTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
