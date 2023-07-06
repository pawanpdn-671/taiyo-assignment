import { useState } from "react";
import CreateEditUser from "../components/CreateEditUser";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../redux/UserReducer";

const ContactPage = () => {
	const [createContact, setCreateContact] = useState(false);
	const [action, setAction] = useState("");
	const users = useSelector((state) => state.users);
	const [editUser, setEditUser] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [contactId, setContactId] = useState(null);
	const dispatch = useDispatch();

	const handleDeleteContact = () => {
		dispatch(deleteContact({ id: contactId }));
		setShowDeleteModal(false);
	};

	return (
		<div className="w-full">
			<div className="flex justify-end p-8">
				<button
					className="rounded-md bg-blue-500 px-7 text-white font-semibold text-lg py-2"
					onClick={() => {
						setAction("Create");
						setCreateContact(true);
					}}>
					Create Contact
				</button>
			</div>

			{users?.length > 0 ? (
				<div className="mt-8 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-8">
					{users?.map((user) => (
						<div
							className="p-8 bg-gray-200 rounded-lg"
							key={user.id}>
							<p className="text-lg font-semibold break-words">
								Name: {user.firstName.toUpperCase()}{" "}
								{user.lastName.toUpperCase()}
							</p>
							<p className="mt-4 text-lg font-semibold">
								Status: {user.status.toUpperCase()}
							</p>
							<div className="mt-8 flex justify-center">
								<button
									className="rounded-md mx-4 bg-red-600 text-white font-semibold text-sm py-2 px-4"
									onClick={() => {
										setShowDeleteModal(true);
										setContactId(user.id);
									}}>
									Delete
								</button>
								<button
									className="rounded-md mx-4 bg-green-600 text-white font-semibold text-sm py-2 px-4"
									onClick={() => {
										setEditUser(user);
										setAction("Edit");
										setCreateContact(true);
									}}>
									Edit
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="xs:mx-4 flex items-center max-w-max sm:mx-auto mt-12 bg-slate-200 p-6 rounded-lg ">
					<i className="fa-solid fa-circle-xmark text-3xl"></i>
					<div className="text-lg ml-4 font-semibold">
						<p>No Contact Found</p>
						<p>
							Please add contact from Create Contact Button.
						</p>
					</div>
				</div>
			)}

			{createContact && (
				<CreateEditUser
					action={action}
					setCreateContact={setCreateContact}
					editUser={editUser}
				/>
			)}
			{showDeleteModal && (
				<div className="fixed inset-x-0 inset-y-0 modal flex items-center justify-center z-50">
					<div className="rounded-md bg-white modal-content p-8">
						<p className="text-center text-lg font-semibold">
							Are you sure you want to delete the contact?
						</p>
						<div className="flex justify-end mt-8">
							<button
								className="text-black rounded-md bg-gray-300 py-2 px-4"
								onClick={() => setShowDeleteModal(false)}>
								Cancel
							</button>
							<button
								className="ml-6 text-white rounded-md bg-red-600 py-2 px-4"
								onClick={handleDeleteContact}>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default ContactPage;
