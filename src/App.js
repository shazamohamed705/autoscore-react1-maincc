import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Gallery from './Components/Gallery/Gallery';
import Questions from './Components/Questions/Questions';
import Articles from './Components/Articles/Articles';
import Info from './Components/Info/Info';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Report from './Components/Report/Report';
import ReportResult from './Components/ReportResult/ReportResult'
import DebugReport from './Components/Report/DebugReport';
import Appointment from './Components/Appointment1/Appointment';
import CustomerReviews from './Components/Home/CustomerReviews';
import WhyCar from './Components/Home/WhyCar';
import CarReporets from './Components/Home/CarReporets';
import CarProcess from './Components/Home/CarProcess';
import Articles1 from './Components/Articles/Articles1';
import Articles2 from './Components/Articles/Articles2';
import Articles3 from  './Components/Articles/Articles3';
import Articles4 from './Components/Articles/Articles4';
import Articles5 from './Components/Articles/Articles5';
import Articles6 from './Components/Articles/Articles6';
import Articles7 from './Components/Articles/Articles7';
import Articles8 from './Components/Articles/Articles8';
import Articles9 from './Components/Articles/Articles9';
import Example from  './Components/Home/Example';
import { AuthProvider } from './Components/context/AuthContext';
import { DarkModeProvider } from './Components/context/DarkModeContext';

let routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'questions', element: <Questions /> },
      { path: 'articles', element: <Articles /> },
      { path: 'report', element: <Report /> },
      { path: 'report-result', element: <ReportResult /> },
      { path: 'debug-report', element: <DebugReport /> },
      { path: 'info', element: <Info /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'appointment', element: <Appointment /> },
     { path: 'customerreviews', element: <CustomerReviews/> },
     { path: 'why-car', element: <WhyCar/> },
     { path: 'car-reporets', element: <CarReporets/> },
{ path: 'car-process', element: <CarProcess/> },
{ path: 'articles1', element: <Articles1/> },
{ path: 'articles2', element: <Articles2/> },
{ path: 'articles3', element: <Articles3/> },
{ path: 'articles4', element: <Articles4/> },
{ path: 'articles5', element: <Articles5/> },
{ path: 'articles6', element: <Articles6/> },
{ path: 'articles7', element: <Articles7/> },
{ path: 'articles8', element: <Articles8/> },
{ path: 'articles9', element: <Articles9/> },
{ path: 'example', element: <Example/> },



    ]
  }

]);

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={routes} />
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
