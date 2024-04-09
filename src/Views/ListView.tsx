import { Box, Button, List, Sheet, Typography, colors } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import ListCard from "../Compoenents/ListCard";
import { useMainStore } from "../Stores/MainStore";
import { useState } from "react";

export default function ListView() {
	const MainStore = useMainStore();

	const [loading, setLoading] = useState(false);

	const onViewOnMapPress = (club: any) => {
		MainStore.setSelectedVenue(club);
		MainStore.setCurrentView("map");
	};

	const venues = MainStore.searchTerm
		? MainStore.searchedVenues
		: MainStore.venues;

	const onLoadMore = async () => {
		try {
			setLoading(true);
			await MainStore.fetchVenues(false, MainStore.sort);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				padding: {
					sm: "1em",
					md: "1em 12em",
				},
			}}>
			{venues.map((venue, i) => (
				<ListCard venue={venue} key={i} onViewOnMapPress={onViewOnMapPress} />
			))}
			{/* <Box>
				<Button
					onClick={onLoadMore}
					variant="outlined"
					sx={{
						left: "50%",
						transform: "translateX(-50%)",
					}}>
					<Typography level="body-sm">Load More</Typography>
				</Button>
			</Box> */}
		</Box>
	);
}
