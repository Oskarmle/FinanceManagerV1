import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryEntity } from "../category/CategoryEntity";
import { CategoriesAPI } from "../APIs/CategoryAPI";
import { SwipeListView } from "react-native-swipe-list-view";

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePress = (id: number) => {
    CategoriesAPI.deleteCategory(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.header}>All categories</Text>
      <View style={styles.headerRows}>
        <Text style={styles.headerRow}>Name</Text>
        <Text style={styles.headerRow}>Amount of entries</Text>
      </View>
      <View style={styles.content}>
        {/* <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                <Text style={styles.row}>{item.category}</Text>
                <View style={styles.line}></View>
              </TouchableOpacity>
            </View>
          )}
        /> */}
        <SwipeListView
          data={categories}
          renderItem={({ item }) => (
            <View key={item.id}>
              <TouchableOpacity activeOpacity={1}>
                <Text style={styles.row}>{item.category}</Text>
                <View style={styles.line}></View>
              </TouchableOpacity>
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View style={styles.hiddenContainer}>
              <TouchableOpacity
                onPress={() => handleDeletePress(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
        />
      </View>
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
  headerRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#F4F4F4",
    backgroundColor: "#7994BC",
  },
  headerRow: {
    color: "#F4F4F4",
    paddingBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 12,
  },
  content: {
    padding: 0,
  },
  line: {
    height: 1,
    backgroundColor: "#D8D8D8",
  },
  row: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: "#F4F4F4",
  },
  hiddenContainer: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#D74141",
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 32,
  },
  deleteText: {
    color: "#F4F4F4",
  },
});
