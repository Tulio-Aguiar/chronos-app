import { useEffect, useState } from "react";
import styles from './styles.module.css'

type WorkDuration = number;
type BreakDuration = number;
type InputEvent = React.ChangeEvent<HTMLInputElement>

export default function PomodoroConfig(){


const [workDuration, setWorkDuration] = useState<WorkDuration>(()=>{
    const stored = localStorage.getItem('workDuration');
    return stored ? Number(stored) : 25;
});

function handleWorkDuration (e:InputEvent){
    setWorkDuration(Number(e.target.value));
}

const [breakDuration, setBreakDuration] = useState<BreakDuration>(()=>{
    const stored = localStorage.getItem('breakDuration');
    return stored ? Number(stored):5;
})

function handleBreakDuration (e:InputEvent){
    setBreakDuration(Number(e.target.value));
}

useEffect(() => {
    localStorage.setItem('workDuration', String(workDuration));
    localStorage.setItem('breakDuration', String(breakDuration));
  }, [workDuration, breakDuration]);


    return(
        <>
            <div className={styles.pomodoroTest}>
                <input type="number" name="" id="" onChange={handleWorkDuration} value={workDuration} />
                <input type="number" name="" id="" onChange={handleBreakDuration} value={breakDuration} />

                <p>Trabalho:{workDuration} | Pausa:{breakDuration}</p>
            </div>
        </>
    )
}