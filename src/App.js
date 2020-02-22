import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Items from './components/Items';
import EditItem from './components/EditItem';
import AddItem from './components/AddItem';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Items} />
          <Route path='/addItem' component={AddItem} />
          <Route path='/:item_id' component={EditItem} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App
