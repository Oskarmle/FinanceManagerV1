import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { TextInput } from "react-native-gesture-handler";
import { UserEntity } from "../../user/UserEntity";
import { signin } from "../../user/userSlice";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state: RootState) => state.user.errormessage);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    dispatch(signin(new UserEntity(username, password)));
  };

  return (
    <View style={styles.container}>
      <Text>Signin</Text>
      <Text>{error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Sign in" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
