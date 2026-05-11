import { SaveIcon } from "lucide-react";
import Container from "../../components/Container";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import Heading from "../../components/Heading";

import MainTemplate from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export default function Settings() {
  useEffect(() => {
    document.title = "Configurações - Chronos";
  }, []);
  const worTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTaskContext();

  function handleSaveSettings(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors: string[] = [];

    const workTime = Number(worTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Digie Apenas Números para todos os campos");
    }

    if (workTime < 1 || shortBreakTime < 1 || longBreakTime < 1) {
      formErrors.push("O tempo deve ser maior que 0");
    }
    if (workTime > 120 || shortBreakTime > 120 || longBreakTime > 120) {
      formErrors.push("O tempo deve ser menor que 120");
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }
    localStorage.setItem("workTime", String(workTime));
    localStorage.setItem("shortBreakTime", String(shortBreakTime));
    localStorage.setItem("longBreakTime", String(longBreakTime));
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas com sucesso");
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>

        <Container>
          <p style={{ textAlign: "center" }}>
            Modifique as configurações para o tempo de foco, descanso curto e
            descanso longo
          </p>
        </Container>

        <Container>
          <form onSubmit={handleSaveSettings} action="" className="form">
            <div className="formRow">
              <DefaultInput
                id="worktime"
                labelText="foco"
                ref={worTimeInputRef}
                defaultValue={state.config.workTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultInput
                id="shortBreakTime"
                labelText="Descanso curto"
                ref={shortBreakTimeInputRef}
                defaultValue={state.config.shortBreakTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultInput
                id="longBreakTime"
                labelText="Descanso longo"
                ref={longBreakTimeInputRef}
                defaultValue={state.config.longBreakTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultButton
                icon={<SaveIcon />}
                aria-label="Salvar"
                title="Salvar"
                type="submit"
              />
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
