import { Routes, Route, Link, Navigate } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ArchiveProvider } from "./state/archive";
import { Shell } from "./components/Mystic";
import AtlasHome from "./pages/AtlasHome";
import Atlas from "./pages/Atlas";
import PathwayDetail from "./pages/PathwayDetail";
import Compare from "./pages/Compare";
import Assessment from "./pages/Assessment";
import Identity from "./pages/Identity";
import Profile from "./pages/Profile";
import SearchArchive from "./pages/SearchArchive";
import "./experience.css";

function App() {
  return (
    <LanguageProvider>
      <ArchiveProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<AtlasHome />} />
            <Route path="/quiz" element={<Assessment />} />
            <Route path="/result/:pathwayId" element={<Identity />} />
            <Route path="/directory" element={<Atlas />} />
            <Route path="/pathways/:id" element={<PathwayDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/responder" element={<Navigate to="/" replace />} />
            <Route path="/plot-search" element={<SearchArchive />} />
            <Route path="/feedback" element={<Navigate to="/" replace />} />
            <Route
              path="/auth/callback"
              element={<Navigate to="/profile" replace />}
            />
            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h1>404 · Lost in the fog</h1>
                  <Link className="button primary" to="/">
                    返回灰雾之上 / Return home
                  </Link>
                </div>
              }
            />
          </Routes>
        </Shell>
      </ArchiveProvider>
    </LanguageProvider>
  );
}

export default App;
