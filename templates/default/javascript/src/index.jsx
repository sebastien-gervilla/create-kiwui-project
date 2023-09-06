import { createRoot } from "kiwui-dom";
import App from "./App";
import './styles/index.css'

const AppRoot = createRoot('root');
AppRoot.render(<App />);