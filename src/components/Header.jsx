import { useLocation } from "react-router-dom";

const Header = () => {
	const { pathname } = useLocation();

	return (
		<div
			className="xs:justify-start sm:justify-center flex items-center justify-center text-2xl font-semibold bg-slate-800 text-gray-100"
			id="header">
			{pathname === "/" || pathname.includes("/contact")
				? "Contact Page"
				: pathname === "/charts-maps"
				? "Charts and Maps"
				: ""}
		</div>
	);
};

export default Header;
