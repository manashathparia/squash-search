import { useEffect } from "react";
import Header from "./Compoenents/Header";
import ListView from "./Views/ListView";
import MapView from "./Views/MapView";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import { useMainStore } from "./Stores/MainStore";

function App() {
	const MainStore = useMainStore();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			MainStore.setCurrentLocation([
				position.coords.latitude,
				position.coords.longitude,
			]);
		});
	}, []);

	useEffect(() => {
		MainStore.fetchVenues(true, MainStore.sort);
	}, [MainStore.sort, MainStore.distance]);

	const customTheme = extendTheme({
		fontFamily: {
			body: "Nunito Sans, sans-serif",
			display: "Nunito Sans, sans-serif",
		},
	});

	const { currentLocation, currentView, setCurrentView } = MainStore;

	console.log("currentLocation", MainStore.sort);
	return (
		<div className="App">
			<CssVarsProvider theme={customTheme}>
				<Header
					currLocation={currentLocation as [number, number]}
					currView={currentView}
					onViewChange={setCurrentView}
				/>
				<div
					style={{
						backgroundColor: "#F7F6F5",
					}}>
					{currentView === "list" ? (
						<ListView />
					) : (
						<MapView currLocation={currentLocation as [number, number]} />
					)}
				</div>
			</CssVarsProvider>
		</div>
	);
}

export default App;
