import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Panel from './Components/Dashboard/Panel';
import Signin from './Components/Signin';
import Signup from './Components/Signup';

const App = () => {
  return (
    <div>

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/panel/:_id' element={<Panel />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}


export default App