import { createSlice } from "@reduxjs/toolkit";
import { defineAbilityFor } from "../utils/ability";

const initialState = {
  roles: [], // 使用者角色
  ability: defineAbilityFor([]), // 初始為無權限
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload;
      state.ability = defineAbilityFor(action.payload); // 更新能力
    },
  },
  selectors: {
    selectAbility: (state) => state.ability,
    selectRoles: (state) => state.roles,
  },
});

export const { setRoles } = authSlice.actions;
export const { selectAbility, selectRoles } = authSlice.selectors;
export default authSlice.reducer;
