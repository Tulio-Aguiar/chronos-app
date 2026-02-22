import DefaultButton from "../DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import type { HomeProps } from "../../pages/Home";

export default function MainForm({ state, setState }: HomeProps) {
  function handleClick() {
    setState((prevState) => ({
      ...prevState,
      config: {
        ...prevState.config,
        workTime: 34,
      },
      formattedSecondsRemaining: "23:34",
    }));
  }

  return (
    <>
      <form className="form" action="">
        <div>
          <button type="button" onClick={handleClick}>
            Clicar
          </button>
        </div>

        <div className="formRow">
          <DefaultInput labelText="Task" title="Title" id="input" type="text" />
        </div>

        <div className="formRow">
          <p>Próximo Intervalo é de {state.config.workTime} minutos</p>
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
