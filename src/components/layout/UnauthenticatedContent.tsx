import { Redirect, Route, Switch } from 'wouter';

import LoginPage from '../../pages/login/LoginPage';
import SignUpPage from '../../pages/signup/SignUpPage';

const UnauthenticatedContent: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
};

export default UnauthenticatedContent;
