import { useState, useEffect } from "react";
import { addContact, editContact } from "../redux/UserReducer";
import { useDispatch, useSelector } from "react-redux";

const CreateEditUser = ({ action, setCreateContact, editUser }) => {
	const [formValues, setFormValues] = useState({
		id: null,
		firstName: "",
		lastName: "",
		status: "active",
	});
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formValues.firstName) {
			alert("First Name is required!");
			return;
		} else if (!formValues.lastName) {
			alert("Last Name is required!");
			return;
		} else {
			if (action === "Create") {
				dispatch(
					addContact({
						id: users?.length + 1,
						firstName: formValues.firstName,
						lastName: formValues.lastName,
						status: formValues.status,
					}),
				);
			}
			if (action === "Edit") {
				dispatch(
					editContact({
						id: editUser.id,
						firstName: formValues.firstName,
						lastName: formValues.lastName,
						status: formValues.status,
					}),
				);
			}
			setFormValues({
				id: null,
				firstName: "",
				lastName: "",
				status: "active",
			});
			setCreateContact(false);
		}
	};

	useEffect(() => {
		if (action === "Edit" && editUser) {
			setFormValues({
				id: editUser.id,
				firstName: editUser.firstName,
				lastName: editUser.lastName,
				status: editUser.status,
			});
		}
	}, [editUser]);

	const handleClose = () => {
		setFormValues({
			id: null,
			firstName: "",
			lastName: "",
			status: "active",
		});
		setCreateContact(false);
	};

	return (
		<div className="fixed z-50 inset-x-0 inset-y-0 modal flex items-center justify-center">
			<div className="rounded-md bg-white modal-content relative">
				<i
					className="fa-solid fa-xmark cursor-pointer text-2xl absolute top-2 right-4"
					onClick={handleClose}></i>
				<p className="xs:text-lg p-4 sm:text-2xl text-center font-bold">
					{action} Contact Screen
				</p>
				<form
					className="xs:px-4 xs:pb-4 sm:px-8 sm:pb-8"
					onSubmit={handleSubmit}>
					<div className="my-4 flex flex-col">
						<label
							htmlFor="firstName"
							className="font-semibold">
							First Name
						</label>
						<input
							className="px-4 outline-none border-gray-200 rounded-md h-10 border-2 block w-full mt-1"
							type="text"
							id="firstName"
							value={formValues.firstName}
							onChange={(e) =>
								setFormValues({
									...formValues,
									firstName: e.target.value,
								})
							}
						/>
					</div>
					<div className="my-4 flex flex-col">
						<label htmlFor="lastName" className="font-semibold">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							className="px-4 outline-none border-gray-200 rounded-md h-10 border-2 block w-full mt-1"
							value={formValues.lastName}
							onChange={(e) =>
								setFormValues({
									...formValues,
									lastName: e.target.value,
								})
							}
						/>
					</div>
					<div className="flex items-center my-8">
						<span className="text-md font-semibold">
							Status:
						</span>
						<div className="ml-8">
							<div className="my-2 flex items-center cursor-pointer">
								<input
									id="active"
									type="radio"
									value={"active"}
									name="status"
									className="h-4 w-4"
									checked={
										formValues.status === "active"
											? true
											: false
									}
									onChange={(e) =>
										setFormValues({
											...formValues,
											status: e.target.value,
										})
									}
								/>
								<label htmlFor="active" className="ml-2">
									Active
								</label>
							</div>
							<div className="my-2 flex items-center cursor-pointer">
								<input
									id="inactive"
									type="radio"
									value={"inactive"}
									name="status"
									checked={
										formValues.status === "inactive"
											? true
											: false
									}
									onChange={(e) =>
										setFormValues({
											...formValues,
											status: e.target.value,
										})
									}
									className="h-4 w-4"
								/>
								<label htmlFor="inactive" className="ml-2">
									Inactive
								</label>
							</div>
						</div>
					</div>
					<button
						type={"submit"}
						className="rounded-md bg-gray-500 block mt-8 mx-auto px-7 text-white font-semibold xs:text-md sm:text-lg py-2">
						{action === "Create" ? "Save" : "Save Editted"}{" "}
						Contact
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateEditUser;
