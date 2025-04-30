import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { TextInput } from "react-native-gesture-handler";
import { UserEntity } from "../../user/UserEntity";
import { signin } from "../../user/userSlice";
import { LoginSignupStackParamList } from "../../NavigationWrapper";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error message from the Redux store
  const error = useSelector((state: RootState) => state.user.errormessage);
  const dispatch = useDispatch<AppDispatch>();

  type NavigationProp = NativeStackNavigationProp<LoginSignupStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    dispatch(signin(new UserEntity(username, password)));
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text>Signin</Text>
      <Text>{error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Sign in" onPress={handleSubmit} />
      <TouchableOpacity style={styles.signup} onPress={handleSignupPress}>
        <Text>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
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
  signup: {
    padding: 10,
    borderRadius: 5,
  },
});
