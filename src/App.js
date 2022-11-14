import './App.css';
import { Route, Switch} from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDetails from './EmpDetails';
import EmpEdit from './EmpEdit';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={EmpListing}></Route>
        <Route exact path="/employee/create" component={EmpCreate}></Route>
        <Route exact path="/employee/details/:id" component={EmpDetails}></Route>
        <Route exact path="/employee/edit/:id" component={EmpEdit}></Route>
      </Switch>
    </div>

// https://www.youtube.com/watch?v=i3J8gyARN-Y&ab_channel=NihiraTechiees
// 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
  );

}

export default App;
