import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Home,
  ActorDetails,
  MovieDetails,
  ListActors,
  ListMovies,
  EditActor,
  EditMovie,
  CreateMovie,
  CreateActor
} from './views'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={ListMovies} />
          <Route exact path="/actors" component={ListActors} />
          <Route exact path="/actors/new" component={CreateActor} />
          <Route exact path="/movies/new" component={CreateMovie} />
          <Route exact path="/movies/:movieId" component={MovieDetails} />
          <Route exact path="/actors/:actorId" component={ActorDetails} />
          <Route exact path="/movies/:movieId/edit" component={EditMovie} />
          <Route exact path="/actors/:actorId/edit" component={EditActor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
