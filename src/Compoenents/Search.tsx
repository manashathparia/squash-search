import React from "react";

interface SearchProps {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search() {
	return <div>Search</div>;
}
