import Container from "../../components/Container";
import CountDown from "../../components/CountDown";
import MainForm from "../../components/MainForm";
import MainTemplate from "../../templates/MainTemplate";




export default function Home() {

    return (
      <>
       <MainTemplate>
      <Container>
        <CountDown/>
      </Container>
      
      <Container>
        <MainForm/>
        </Container>
    </MainTemplate>
      </>
    )
  }