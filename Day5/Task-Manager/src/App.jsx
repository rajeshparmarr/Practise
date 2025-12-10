import "./App.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import SingleTaskPage from "./pages/SingleTaskPage";
import PageNotFound404 from "./pages/PageNotFound404";
import Default from "./pages/Default";

function App() {
    return <>
        <Router>
            <Routes>
                <Route path="/" element={ <Default/>} />
                <Route path="/home" element={<Home />}>Home</Route>
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/task-list" element={<AddTask />} />
                <Route path="/single-task-page" element={<SingleTaskPage />} />
                <Route path="/page-not-found" element={ <PageNotFound404/>} />
            </Routes>
        </Router>
  </>;
}

export default App;
