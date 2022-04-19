// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home'
import Footer from './Footer'

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
    // <Router>
    //   <div className="App">
        // <Header />
    //     <div className="content">
    //       <Switch>
    //         <Route exact path="/">
    //           <Home />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
