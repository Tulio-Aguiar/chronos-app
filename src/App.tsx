import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import MessagesContainer from "./MessagesContainer";
import MainRouter from "./routers/MainRouter";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";

export default function App() {
  return (
    // Peça 2
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
