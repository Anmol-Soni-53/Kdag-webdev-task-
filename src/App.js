// import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlaylistDetail from './playlistDetail';
import Create from './create';
import Library from './library';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route exact path="/create" >
              <Create></Create>
            </Route>
            <Route exact path="/library">
              <Library></Library>
            </Route>
            {/* <Route exact path="/create">
              <Create />
            </Route> */}
            <Route exact path="/playlist/:id">
              <PlaylistDetail></PlaylistDetail>
            </Route>
            <Route exact path="/playlist/:id/names">
              <PlaylistDetail></PlaylistDetail>
            </Route>

            {/* <Route path='*'>
              <NotFound />
            </Route> */}
          </Switch>

          {/* <Home></Home> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
