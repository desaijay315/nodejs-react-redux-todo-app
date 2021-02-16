import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Bucket from './components/bucket/Bucket';
import Todo from './components/todo/Todo';
import Todos from './components/todos/Todos';

function App() {
  return (
    <Router>
      <Link to="/">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
      </Link>
      <Route path="/" component={Bucket} exact />
      <Route path="/bucket/:id/todos" component={Todos} exact />
      <Route path="/todo/:id" component={Todo} exact />
    </Router>
  );
}

export default App;
