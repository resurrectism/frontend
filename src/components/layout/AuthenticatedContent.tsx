import { Redirect, Route, Switch } from 'wouter';

import HomePage from '../../pages/home/HomePage';
import ProfilePage from '../../pages/profile/ProfilePage';

const AuthenticatedContent: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default AuthenticatedContent;
