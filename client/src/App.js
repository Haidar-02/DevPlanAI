import Dashboard from "./Pages/Dashboard/Dashboard";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginSignup from "./Pages/LoginSignUp/LoginSignup";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/auth" component={LoginSignup} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
