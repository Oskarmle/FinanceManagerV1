import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersAPI } from "../APIs/UserAPI";
import { UserEntity } from "./UserEntity";
import * as SecureStore from "expo-secure-store";

export const signup = createAsyncThunk(
  "users/create",
  async (createUser: UserEntity, thunkAPI) => {
    return await UsersAPI.createUser(createUser);
  }
);

export const signin = createAsyncThunk(
  "users/signin",
  async (signinUser: UserEntity, thunkAPI) => {
    return await UsersAPI.signinUser(signinUser);
  }
);

interface UserState {
  token: string;
  errormessage: string;
}

const initialState: UserState = {
  token: "",
  errormessage: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
      SecureStore.setItemAsync("jwt", "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.errormessage = "";
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("payload", action.payload);
      state.errormessage = "Error signing up";
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      SecureStore.setItemAsync("token", action.payload.token);
      state.token = action.payload.token;
      console.log("state.token", state.token);

      state.errormessage = "";
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.log("payload", action.payload);
      state.errormessage = "Error signing in";
    });
  },
});

export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
