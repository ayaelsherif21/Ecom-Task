import { StoreProvider } from "./context/StoreContext";
import Accordion from "./components/Accordion";
import ReviewPanel from "./components/ReviewPanel";
import "./App.css";

function BuilderShell() {
  return (
    <div className="app">
      <div className="app__inner">
        <div className="app__builder">
          <Accordion />
        </div>
        <div className="app__review">
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BuilderShell />
    </StoreProvider>
  );
}
