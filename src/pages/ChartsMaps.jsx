import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import { Chart } from "chart.js/auto";
import { icon } from "leaflet";

const ChartsMaps = () => {
	const [casesData, setCasesData] = useState({});
	const [countriesData, setCountriesData] = useState([]);

	const getCases = async () => {
		await fetch(
			"https://disease.sh/v3/covid-19/historical/all?lastdays=all",
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCasesData(data?.cases);
			})
			.catch((err) => console.log(err));
	};

	const getCountriesData = async () => {
		await fetch("https://disease.sh/v3/covid-19/countries")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCountriesData(data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getCases();
		getCountriesData();
	}, []);

	useEffect(() => {
		const ctx = document.getElementById("lineChart");
		const chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: Object.keys(casesData),
				datasets: [
					{
						label: "Cases",
						data: Object.values(casesData),
						borderColor: "#ab3f3c",
						tension: 0.3,
						borderWidth: 0.1,
					},
				],
			},
			options: {
				scales: {
					x: {
						grid: {
							display: false,
						},
					},
					y: {
						grid: {
							display: false,
						},
						beginAtZero: true,
					},
				},
				legend: {
					display: false,
				},
			},
		});
		return () => {
			chart.destroy();
		};
	}, [casesData]);

	const ICON = icon({
		iconUrl: "/marker-icon.png",
		iconSize: [28, 42],
	});

	return (
		<div className="w-full">
			<p className="mt-8 text-center text-2xl font-bold text-gray-700">
				Cases Fluctuations
			</p>
			<div className="mt-8 p-8 line-chart w-full">
				<canvas id="lineChart"></canvas>
			</div>
			<p className="mt-12 text-center text-2xl font-bold text-gray-700">
				Countries Cases Map
			</p>
			<div className="z-2 mt-0 p-8 pb-12">
				<MapContainer center={[20, 77]} zoom={13}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{countriesData?.map((country) => (
						<Marker
							icon={ICON}
							position={[
								country["countryInfo"]["lat"],
								country["countryInfo"]["long"],
							]}
							key={country["country"]}>
							<Popup>
								Country: {country["country"]}
								<br />
								Active: {country["active"]} <br />
								Recovered: {country["recovered"]} <br />
								Deaths: {country["deaths"]}
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
		</div>
	);
};

export default ChartsMaps;
