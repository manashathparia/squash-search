import { Box, Sheet, Typography, styled } from "@mui/joy";
import { Venue } from "../types";

const ActionBox = styled(Box, { name: "ActionBox" })(({ theme }) => ({
	width: 200,
	marginLeft: 10,
	backgroundColor: "#EFEEEC",
	borderRadius: "10px 10px 0 0",
	padding: "1em 0",
}));

interface ListCardProps {
	venue: Venue;
	compact?: boolean;
	onViewOnMapPress?: (venue: any) => void;
}

export default function ListCard({
	venue,
	compact,
	onViewOnMapPress,
}: ListCardProps) {
	return (
		<Sheet
			key={venue.name}
			sx={{
				marginBottom: "1em",
				padding: "1.5em",
				paddingBottom: 0,
				borderBottom: "2px solid #efeeec",
			}}>
			<Typography
				level="h3"
				sx={{
					color: "#D50032",
				}}>
				{venue.name}
			</Typography>
			<span style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
				<Typography level="body-xs">2 miles away</Typography>
				{!compact && (
					<Typography
						onClick={() => onViewOnMapPress && onViewOnMapPress(venue)}
						level="body-xs"
						sx={{ ml: 1, color: "#D50032", cursor: "pointer" }}>
						View on map
					</Typography>
				)}
			</span>
			<Typography level="body-md" sx={{ my: 1 }}>
				{venue.physical_address}
			</Typography>

			<Box
				sx={{
					display: compact ? "block" : "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Typography level="body-sm">COURTS: {venue.no_of_courts}</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mt: compact ? 1 : 0,
					}}>
					<ActionBox>
						<Typography level="body-sm" sx={{ ml: 1 }}>
							Clubs
						</Typography>
					</ActionBox>
					<ActionBox>
						<Typography level="body-sm" sx={{ ml: 1 }}>
							Coaches
						</Typography>
					</ActionBox>
					<ActionBox sx={{}}>
						<Typography level="body-sm" sx={{ ml: 1 }}>
							Sessions
						</Typography>
					</ActionBox>
				</Box>
			</Box>
		</Sheet>
	);
}
