import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	Option,
	Select,
	Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useMainStore } from "../Stores/MainStore";
import { Search } from "@mui/icons-material";

interface HeaderProps {
	currLocation: [number, number];
	currView: string;
	onViewChange: (view: string) => void;
}

export default function Header(props: HeaderProps) {
	const MainStore = useMainStore();
	const [locationName, setLocationName] = useState("");
	const [searchVisible, setSearchVisible] = useState(false);

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
					{locationName ? (
						<Typography level="h4">{locationName}</Typography>
					) : (
						"Loading..."
					)}
				</Typography>

				<Box
					sx={{
						display: {
							sm: "none",
							md: "flex",
						},
						alignItems: "center",
					}}>
					<IconButton onClick={() => setSearchVisible(!searchVisible)}>
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
							<Option value={500}>5 miles</Option>
							<Option value={10000}>10 miles</Option>
							<Option value={15000}>15 miles</Option>
						</Select>
					</Box>
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
				<Input
					placeholder="Search"
					value={MainStore.searchTerm}
					onChange={(e: any) => MainStore.setSearchTerm(e.target.value)}
				/>
			</Box>
		</Box>
	);
}
