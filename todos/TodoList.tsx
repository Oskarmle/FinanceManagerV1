import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoEntity } from "./TodoEntity";

export type TodoListProps = {
  todoItem: TodoEntity;
  toggleTodoCompletion: (id: number) => void;
};

export default function TodoList({
  todoItem,
  toggleTodoCompletion,
}: TodoListProps) {
  const handleOnPress = () => {
    toggleTodoCompletion(todoItem.id);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.todo, todoItem.completed && styles.completedTodo]}
        onPress={handleOnPress}
      >
        <Text style={styles.todoText}>{todoItem.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    color: "#ffffff",
    backgroundColor: "red",
    marginBottom: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
  },
  completedTodo: {
    color: "white",
    backgroundColor: "green",
  },
  todoText: {
    color: "white",
  },
});
