import DefaultButton from "../DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";

export default function MainForm(){


    return(
        <>
         <form className="form" action="">
      <div className="formRow">
      <DefaultInput labelText='Task' title="Title" id='input' type='text'/>
      </div>

      <div className="formRow">
       <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="formRow">
        <Cycles/>
      </div>

    
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon/>} color="green" />
        {/* <DefaultButton icon={<StopCircleIcon/>} color="red" /> */}
      </div>
     </form>

        </>
    )
}