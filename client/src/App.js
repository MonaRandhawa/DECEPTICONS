import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Home from "./pages/HomePage";
import Categories from "./pages/CategoriesPage";
import PlayPage from "./pages/PlayPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Upload from "./components/Upload";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/play" component={PlayPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default App;
