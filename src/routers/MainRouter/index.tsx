import { Routes, Route, BrowserRouter, useLocation } from "react-router";
import History from "../../pages/History";
import AboutPomodoro from "../../pages/Home/AboutPomodoro";
import Home from "../../pages/Home";
import NotFound from "../../pages/Home/NotFound";
import { useEffect } from "react";
import Settings from "../../pages/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function MainRouter() {
  useEffect(() => {
    document.title = "Chronos-APP";
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about-pomodoro" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
