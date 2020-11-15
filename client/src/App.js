import React from "react";
import AppLayout from "./AppLayout/AppLayout";
import { Route } from "react-router-dom";
import CardList from "./pages/CardList";
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import Register from './AppLayout/Register';


const App = () => {

  return (
    
    <AppLayout>
      <Route path="/" render={()=> <CardList />} exact={true} />
      <Route path="/register" component={Register} exact={true} />
      <Route path="/write" component={PostWrite} exact={true} />
      <Route path="/view" component={PostView} exact={true} />
      <Route path="/dev/:categori" component={CardList} exact={true} />
      <Route path="/hobby/:categori" component={CardList} exact={true} />
    </AppLayout>
    
  );
};

export default App;
