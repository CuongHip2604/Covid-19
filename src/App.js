import CountrySeletor from "./components/CountrySelector";
import Summary from "./components/Summary";
import Highlight from "./components/Highlight";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import "@fontsource/roboto";

function App() {
  return (
    <Container style={{ marginTop: 20 }}>
      <div className="app">
        <Typography variant="h3" component="h3">
          Covid-19 Data
        </Typography>
        <Typography>{moment().format("LLL")}</Typography>
        <CountrySeletor />
        <Highlight />
        <Summary />
      </div>
    </Container>
  );
}

export default App;
