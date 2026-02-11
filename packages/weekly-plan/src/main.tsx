import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from '@course-dashboard/shared';
import { CourseProvider } from "./contexts/CourseContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <CourseProvider>
      <App />
    </CourseProvider>
  </ThemeProvider>
);
