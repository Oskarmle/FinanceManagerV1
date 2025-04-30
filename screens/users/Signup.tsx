import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { LoginSignupStackParamList } from "../../NavigationWrapper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { UserEntity } from "../../user/UserEntity";
import { signup } from "../../user/userSlice";

export default function Signup() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  type NavigationProp = NativeStackNavigationProp<LoginSignupStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    console.log("Signup", username, password);
    dispatch(signup(new UserEntity(username, password)));
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <TextInput
        style={styles.input}
        onChangeText={SetUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={SetPassword}
        value={password}
        placeholder="Password"
      />
      <Button title="Sign up now" onPress={handleSubmit} />
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
