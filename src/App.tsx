import { Route, Routes } from "react-router-dom";
import NFTListPage from "./pages/NFTListPage";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/nfts" element={<NFTListPage />}>
        <Route path=":address" element={<NFTListPage />} />
      </Route>
    </Routes>
  );
}
