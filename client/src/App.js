import React from "react";
import AppLayout from "./AppLayout/AppLayout";
import { Route } from "react-router-dom";
import CardList from "./component/CardList";

const App = () => {
  return (
    <AppLayout>
      <Route path="/" component={CardList} exact={true} />
      <Route path="/dev/:categori" component={CardList} exact={true} />
      <Route path="/hobby/:categori" component={CardList} exact={true} />
    </AppLayout>
  );
};

export default App;
