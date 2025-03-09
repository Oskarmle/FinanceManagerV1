import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function CreateEntry() {
  const [entry, setEntry] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const paymentMethods = [
    { label: "Cash", value: "Cash" },
    { label: "Credit card", value: "Credit card" },
    { label: "Debit card", value: "Debit card" },
    { label: "Mobile payment", value: "Mobile payment" },
    { label: "Bank transfer", value: "Bank transfer" },
  ];

  const categories = [
    { label: "Food", value: "Food" },
    { label: "Housing", value: "Housing" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Other", value: "Other" },
    { label: "Sport", value: "sport" },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Add a new entry</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Add title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="1234"
          value={entry}
          onChangeText={setEntry}
        />
        <Text style={styles.label}>Payment method</Text>
        <Dropdown
          style={styles.dropdownInput}
          data={paymentMethods}
          labelField="label"
          onChange={setPaymentMethod}
          value={paymentMethod}
          valueField="value"
          placeholder={"Select payment method"}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
        />
        <Text style={styles.label}>Choose category</Text>
        <Dropdown
          style={styles.dropdownInput}
          data={categories}
          labelField="label"
          onChange={setCategory}
          value={category}
          valueField="value"
          placeholder={"Select category"}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
        />
        <Text style={styles.label}>Date of purchase</Text>
        <Button title="Select date" onPress={() => setOpen(true)}></Button>
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
    backgroundColor: "#BC7979",
    padding: 12,
    color: "#F4F4F4",
    fontSize: 16,
  },
  label: {
    color: "#707070",
    fontSize: 15,
    paddingTop: 12,
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    gap: 6,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#DADADA",
  },
  dropdownInput: {
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: "#DADADA",
    color: "#707070",
  },
  button: {
    fontSize: 16,
    color: "#4E4667",
    textDecorationLine: "underline",
    paddingLeft: 12,
    marginBottom: 12,
  },
  placeholder: {
    color: "#707070",
  },
  selectedText: {
    color: "black",
  },
});
