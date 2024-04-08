// zustand store

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Venue } from "../types";
import axios from "axios";

const SERVER_URL =
	process.env.NODE_ENV === "production"
		? "https://torflix-jswtp874x-manashathparia.vercel.app/fetch/?url=http://3.109.186.19:8080"
		: // ? "https://squash-search-server.vercel.app"
		  "http://localhost:8080";

const milesToMeters = (miles: number) => miles * 1609.34;

interface MainStore {
	currentLocation: [number, number];
	venues: Venue[];
	searchedVenues: Venue[];
	sort: string;
	distance: number;
	searchTerm: string;
	locationDenied: boolean;
	setSearchTerm: (searchTerm: string) => void;
	fetchVenues: (reset: boolean, sort?: string) => Promise<void>;
	setCurrentLocation: (location: [number, number]) => void;
	currentView: string;
	setCurrentView: (view: string) => void;
	selectedVenue: any;
	setSelectedVenue: (venue: any) => void;
	setSort: (sort: string) => void;
	setDistance: (distance: number) => void;
	searchVenues: (searchTerm: string) => Promise<void>;
	setLocationDenied: (denied: boolean) => void;
}

export const useMainStore = create<MainStore>()(
	devtools((set, get) => ({
		currentLocation: [0, 0],
		venues: [],
		currentView: "list",
		selectedVenue: null,
		sort: "distance",
		distance: 5,
		searchTerm: "",
		searchedVenues: [],
		locationDenied: false,

		setCurrentLocation: (location: [number, number]) =>
			set(() => ({ currentLocation: location })),

		setCurrentView: (view: string) => set(() => ({ currentView: view })),

		setSelectedVenue: (venue: any) => set(() => ({ selectedVenue: venue })),

		setLocationDenied: (denied: boolean) =>
			set(() => ({ locationDenied: denied })),

		fetchVenues: async (reset: boolean, sort?: string) => {
			const { data } = await axios.get(
				`${SERVER_URL}/venues?sort=${sort}&targetLat=${
					get().currentLocation[0]
				}&targetLon=${get().currentLocation[1]}&radius=${milesToMeters(
					get().distance
				)}&limit=5&skip=${reset ? 0 : get().venues.length}`
			);

			set(() => ({ venues: reset ? data : [...data, ...data] }));
		},

		searchVenues: async (searchTerm: string) => {
			const { data } = await axios.get(
				`${SERVER_URL}/venues/?search=${searchTerm}&targetLat=${
					get().currentLocation[0]
				}&targetLon=${get().currentLocation[1]}&radius=${milesToMeters(
					get().distance
				)}&sort=${get().sort}
				&limit=10
				`
			);

			set(() => ({ searchedVenues: data }));
		},

		setSort: (sort: string) => set(() => ({ sort })),

		setDistance: (distance: number) => set(() => ({ distance })),

		setSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
	}))
);
