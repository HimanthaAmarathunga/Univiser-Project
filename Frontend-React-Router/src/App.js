
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AddCustomer from './delivery/AddCustomer';
import CustomerList from './delivery/CustomerList';
import CustomerUpdate from './delivery/CustomerUpdate';

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={AddCustomer}/>
      <Route path='/customerList' component={CustomerList}/>
      <Route path='/customerUpdate' component={CustomerUpdate}/>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
