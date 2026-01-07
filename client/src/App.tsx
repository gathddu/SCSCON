import { Route, Switch } from 'wouter';
import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-[#0A1F3D] text-[#FFFEF5]">
          <h1>404 - Page Not Found</h1>
        </div>
      </Route>
    </Switch>
  );
}

export default App;

