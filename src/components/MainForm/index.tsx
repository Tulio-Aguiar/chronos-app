import DefaultButton from "../DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import { useRef, useState } from "react";

export default function MainForm() {
  const [taskName, setTaskName] = useState("");
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Deu Certo", taskName, taskNameInput.current.value);
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className="form" action="">
        <div className="formRow">
          <DefaultInput
            labelText="Task"
            title="Title"
            id="input"
            type="text"
            placeholder="Digite Algo"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            ref={taskNameInput}
          />
        </div>

        <div className="formRow">
          <p>Próximo Intervalo é de 25 minutos</p>
        </div>

        <div className="formRow">
          <Cycles />
        </div>

        <div className="formRow">
          <DefaultButton icon={<PlayCircleIcon />} color="green" />
        </div>
      </form>
    </>
  );
}
