import { Route, Switch, useLocation } from 'wouter';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Map from './pages/Map';
import PanicButton from './components/PanicButton';

function App() {
  const [location] = useLocation();
  return (
    <>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component = {Dashboard} />
      <Route path="/alerts" component = {Alerts} />
      <Route path="/map" component = {Map} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-[#0A1F3D] text-[#FFFEF5]">
          <h1>404 - Page Not Found</h1>
        </div>
      </Route>
    </Switch>
    {location !== '/' && <PanicButton />}
    </>
  );
}

export default App;

