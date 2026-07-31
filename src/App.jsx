import ReviewPanel from "./components/reviewPanel/ReviewPanel";
import "./App.css";
import Accordion from "./components/step/Accordion";
import { StoreProvider } from "./context/StoreProvider";

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
