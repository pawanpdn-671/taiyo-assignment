import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ContactPage from "./pages/Contact";
import ChartsMaps from "./pages/ChartsMaps";

function App() {
	return (
		<Router>
			<Header />
			<div className="flex">
				<Sidebar />
				<Routes>
					<Route path="/" element={<ContactPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="charts-maps" element={<ChartsMaps />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
