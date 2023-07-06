import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		addContact: (state, action) => {
			state.push(action.payload);
		},
		editContact: (state, action) => {
			const { id, firstName, lastName, status } = action.payload;
			const existingUser = state.find((user) => user["id"] === id);
			if (existingUser) {
				existingUser.firstName = firstName;
				existingUser.lastName = lastName;
				existingUser.status = status;
			}
		},
		deleteContact: (state, action) => {
			const { id } = action.payload;
			const existingUser = state.find((user) => user["id"] === id);
			if (existingUser) {
				return state.filter((f) => f["id"] !== id);
			}
		},
	},
});

export const { addContact, editContact, deleteContact } =
	userSlice.actions;
export default userSlice.reducer;
