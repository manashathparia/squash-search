import {
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	Input,
	Option,
	Select,
	Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useMainStore } from "../Stores/MainStore";
import { Menu, Search } from "@mui/icons-material";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

interface HeaderProps {
	currLocation: [number, number];
	currView: string;
	onViewChange: (view: string) => void;
}

const libraries = ["places"];

export default function Header(props: HeaderProps) {
	const MainStore = useMainStore();
	const [locationName, setLocationName] = useState("");
	const [searchVisible, setSearchVisible] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResult, setSearchResult] =
		useState<google.maps.places.Autocomplete>();

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
		libraries: libraries as any,
	});

	useEffect(() => {
		if (MainStore.searchTerm) {
			MainStore.searchVenues(MainStore.searchTerm);
		}
	}, [MainStore.searchTerm, MainStore.sort, MainStore.distance]);

	useEffect(() => {
		if (props.currLocation[0] && props.currLocation[1]) {
			fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currLocation[0]}&lon=${props.currLocation[1]}&zoom=18&addressdetails=1`
			)
				.then((res) => res.json())
				.then((data) => {
					setLocationName(data.address.county);
				});
		}
	}, [props.currLocation]);

	function onLoad(autocomplete: google.maps.places.Autocomplete) {
		setSearchResult(autocomplete);
	}

	function locationSelected() {
		if (searchResult) {
			const place = searchResult.getPlace();
			const location = place.geometry?.location;

			const lat = location?.lat();
			const lng = location?.lng();

			if (lat && lng) {
				MainStore.setCurrentLocation([lat, lng]);
			} else {
				alert("Location not found");
			}
		}
	}

	const menuItems = (
		<>
			<IconButton
				sx={{
					display: {
						sm: "none",
						xs: "none",
						md: "flex",
					},
				}}
				onClick={() => setSearchVisible(!searchVisible)}>
				<Search sx={{ color: searchVisible ? "#D50032" : "black" }} />
			</IconButton>
			<Button
				sx={{
					color: props.currView === "list" ? "#D50032" : "black",
					ml: "1em",
				}}
				onClick={() => props.onViewChange("list")}
				variant="plain">
				List
			</Button>
			<Button
				sx={{
					marginLeft: "1em",
					color: props.currView === "map" ? "#D50032" : "black",
				}}
				onClick={() => props.onViewChange("map")}
				variant="plain">
				Map
			</Button>
			<Divider orientation="vertical" sx={{ margin: "0 1em" }} />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}>
				<Typography level="body-sm">Sort By:</Typography>
				<Select
					defaultValue={MainStore.sort}
					sx={{ marginLeft: "1em" }}
					variant="plain"
					onChange={(e: any, newVal: any) => MainStore.setSort(newVal)}>
					<Option value={"distance"}>Distance</Option>
					<Option value={"asc"}>A-Z</Option>
					<Option value={"desc"}>Z-A</Option>
				</Select>
			</Box>
			<Divider orientation="vertical" sx={{ margin: "0 1em" }} />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}>
				<Typography level="body-sm">Distance:</Typography>
				<Select
					defaultValue={MainStore.distance}
					onChange={(e: any, newVal: any) => MainStore.setDistance(newVal)}
					sx={{ marginLeft: "1em" }}
					variant="plain">
					<Option value={50}>5 miles</Option>
					<Option value={100}>10 miles</Option>
					<Option value={150}>15 miles</Option>
				</Select>
			</Box>
		</>
	);

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: {
						sm: "0 1em",
						md: "0 12em",
					},
					// borderBottom: "1px solid #ccc",
					height: "50px",
				}}>
				<Typography level="body-md">
					Location:{" "}
					<Typography level="title-lg">
						{MainStore.locationDenied ? (
							"Location Denied, please enable location services."
						) : locationName ? (
							<Typography level="h4">{locationName}</Typography>
						) : (
							"Loading..."
						)}
					</Typography>
				</Typography>
				<Box>
					<IconButton
						sx={{
							display: {
								sm: "block",
								md: "none",
							},
						}}
						onClick={() => setSearchVisible(!searchVisible)}>
						<Search sx={{ color: searchVisible ? "#D50032" : "black" }} />
					</IconButton>
					<IconButton
						sx={{
							display: {
								sm: "block",
								md: "none",
							},
						}}
						onClick={() => setDrawerVisible(!drawerVisible)}>
						<Menu />
					</IconButton>
				</Box>
				<Box
					sx={{
						display: {
							sm: "none",
							xs: "none",
							md: "flex",
						},
						alignItems: "center",
					}}>
					{menuItems}
				</Box>
			</Box>
			<Box
				sx={{
					padding: {
						sm: "0 1em",
						md: "1em 12em",
					},
					display: searchVisible ? "block" : "none",
				}}>
				{isLoaded && (
					<Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
						<Input
							placeholder="Search"
							// value={MainStore.searchTerm}
							// onChange={(e: any) => setValue(e.target.value)}
						/>
					</Autocomplete>
				)}
			</Box>
			<Drawer
				anchor="right"
				open={drawerVisible}
				onClose={() => setDrawerVisible(false)}>
				<Box
					sx={{
						width: "300px",
						padding: "1em",
					}}>
					{menuItems}
				</Box>
			</Drawer>
		</Box>
	);
}
