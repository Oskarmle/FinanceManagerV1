import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@env";

type EntryFormData = {
  title: string;
  amount: number;
  paymentMethod: string;
  category: string;
  datetime: string;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CreateEntry() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormData>({
    defaultValues: {
      title: "",
      amount: 0,
      paymentMethod: "",
      category: "",
      datetime: formatDate(new Date()),
    },
  });

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const paymentMethods = [
    { label: "Cash", value: "Cash" },
    { label: "Credit card", value: "Credit card" },
    { label: "Debit card", value: "Debit card" },
    { label: "Mobile payment", value: "Mobile payment" },
    { label: "Bank transfer", value: "Bank transfer" },
  ];

  const categories = [
    { label: "Food", value: 2 },
    { label: "Housing", value: 6 },
    { label: "Entertainment", value: 8 },
    { label: "Sport", value: 10 },
    { label: "Other", value: 9 },
  ];

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setDate(formattedDate);
      setSelectedDate(formattedDate);
      setValue("datetime", formattedDate);
    }
    setOpen(false);
  };

  const mutation = useMutation<unknown, Error, EntryFormData>({
    mutationFn: (newEntry) => {
      return axios.post(`http://${API_URL}/entries`, newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {
      console.error("Creating entry failed", error);
    },
    onSuccess: () => {
      console.log("Entry created successfully");
    },
  });

  const handleAddEntry = (data: EntryFormData) => {
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Add a new entry</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder="Add title"
            />
          )}
          name="title"
        />
        <Text style={styles.label}>Amount</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="1234"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text ? parseFloat(text) : 0)}
              value={value ? value.toString() : ""}
            />
          )}
          name="amount"
        />
        <Text style={styles.label}>Payment method</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              style={styles.dropdownInput}
              data={paymentMethods}
              labelField="label"
              onChange={(item) => onChange(item.value)}
              value={value}
              valueField="value"
              placeholder={"Select payment method"}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
            />
          )}
          name="paymentMethod"
        />
        <Text style={styles.label}>Choose category</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              style={styles.dropdownInput}
              data={categories}
              labelField="label"
              valueField="value"
              placeholder={"Select category"}
              onChange={(item) => onChange(item.value)}
              value={value}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
            />
          )}
          name="category"
        />
        <Text style={styles.label}>Date of purchase</Text>
        {open && (
          <RNDateTimePicker
            value={new Date(date)}
            onChange={onChangeDate}
            display="default"
            mode="date"
            maximumDate={new Date()}
          />
        )}
        <TouchableOpacity onPress={() => setOpen(true)}>
          {selectedDate === null ? (
            <Text style={styles.datePicker}>Select date</Text>
          ) : (
            <Text style={styles.datePicker}>{date}</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSubmit(handleAddEntry)}>
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
  datePicker: {
    height: 40,
    padding: 10,
    color: "#707070",
    borderRadius: 10,
    backgroundColor: "#DADADA",
    borderRadius: 10,
  },
});
