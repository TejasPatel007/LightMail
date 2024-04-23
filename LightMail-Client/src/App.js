import "./assets/style/main.css"
import { ToastContainer } from 'react-toastify';
import RouteProvider from "./Route/RouteProvider";
function App() {
  return (
    <>
      <RouteProvider />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
    </>
  );
}

export default App;
