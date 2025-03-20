import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { signout } from "../../user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const handleSignout = () => {
    console.log("Sign out");
    dispatch(signout());
  };

  return (
    <View style={styles.userContainer}>
      <Button title="Sign out" onPress={handleSignout} />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 60,
    gap: 20,
  },
});
