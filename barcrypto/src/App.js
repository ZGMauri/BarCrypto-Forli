import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import ColorSchemesExample from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
<><script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script><script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script><script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossorigin></script><script>var Alert = ReactBootstrap.Alert;</script></>


function App() {
  return (
    <div>
      <ColorSchemesExample />
      
      <div>
        <div className="App">
          <Button className="btn btn-primary">Prueba</Button>
        </div>
        <h1>Probando</h1>
      </div>
    </div>
  );
}

export default App;
