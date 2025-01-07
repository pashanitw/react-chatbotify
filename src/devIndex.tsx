import ReactDOM from "react-dom/client";

// import App from "./App";
import ChatWidget from "./ChatWidget";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<ChatWidget />);
