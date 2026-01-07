import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component = {Dashboard} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-[#0A1F3D] text-[#FFFEF5]">
          <h1>404 - Page Not Found</h1>
        </div>
      </Route>
    </Switch>
  );
}

export default App;

