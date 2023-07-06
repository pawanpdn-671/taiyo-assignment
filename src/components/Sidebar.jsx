import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
	const { pathname } = useLocation();
	const [showHam, setShowHam] = useState(true);

	const handleHamClick = () => {
		const sidebar = document.querySelector(".sidebar");
		sidebar.style.transform = showHam
			? "translateX(0)"
			: "translateX(-100%)";
		sidebar.style.minHeight = "100vh";
		showHam ? setShowHam(false) : setShowHam(true);
	};

	return (
		<>
			<div className="z-20 ease-linear duration-300 -translate-x-full sm:translate-x-0 flex bg-slate-800 sidebar flex-col flex-shrink-0">
				<Link
					to={"/contact"}
					className={`text-white text-lg py-4 px-8 rounded-l-full ${
						pathname === "/" || pathname.includes("/contact")
							? "active"
							: ""
					}`}>
					Contact
				</Link>
				<Link
					to={"/charts-maps"}
					className={`text-white text-lg py-4 px-8 rounded-l-full ${
						pathname === "/charts-maps" ? "active" : ""
					}`}>
					Charts and Maps
				</Link>
			</div>
			{showHam && (
				<i
					className="xs:block sm:hidden absolute cursor-pointer top-3.5 left-5 text-white text-2xl fa-solid fa-bars"
					onClick={handleHamClick}></i>
			)}
			{!showHam && (
				<i
					className="xs:block sm:hidden absolute cursor-pointer top-3.5 left-5 text-white text-2xl fa-solid fa-xmark"
					onClick={handleHamClick}></i>
			)}
		</>
	);
};

export default Sidebar;
