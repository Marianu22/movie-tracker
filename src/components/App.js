import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Movie from "../pages/Movie";
import Watchlist from "../pages/Watchlist";
import History from "../pages/History";
import Recommendations from "../pages/Recommendations";
import GlobalStyle from "../globalstyles";
import styled from "styled-components";

export default function App() {
  const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `;
  return (
    <Router>
      <GlobalStyle />
      <StyledHeader>
        <Header />
        <Switch>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/search/:terms">
            <Search />
          </Route>
          <Route path="/movies/:movieId" exact>
            <Movie />
          </Route>
          <Route path="/watchlist" exact>
            <Watchlist />
          </Route>
          <Route path="/history" exact>
            <History />
          </Route>
          <Route path="/recommendations" exact>
            <Recommendations />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </StyledHeader>
    </Router>
  );
}
