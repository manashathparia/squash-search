import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
	const elm = document.getElementById("squash-search");

	if (elm) {
		const root = ReactDOM.createRoot(elm as HTMLElement);

		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		);
	} else {
		console.error("Element not found");
	}
});
