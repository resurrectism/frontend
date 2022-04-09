import { Redirect, Route, Switch } from 'wouter';

import HomePage from '../../pages/home/HomePage';

const AuthenticatedContent: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default AuthenticatedContent;
