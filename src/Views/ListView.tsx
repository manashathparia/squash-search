import { Box, List, Sheet, Typography, colors } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import ListCard from "../Compoenents/ListCard";
import { useMainStore } from "../Stores/MainStore";

export default function ListView() {
	const MainStore = useMainStore();
	const onViewOnMapPress = (club: any) => {
		MainStore.setSelectedVenue(club);
		MainStore.setCurrentView("map");
	};

	const venues = MainStore.searchTerm
		? MainStore.searchedVenues
		: MainStore.venues;

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
		</Box>
	);
}
