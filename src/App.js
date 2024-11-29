import { Provider } from "react-redux";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router";
import { store } from "./store/store";
import RootLayout from "./components/root-layout";
import Home from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import Examplace from "./pages/examplace";
import Exam from "./pages/exam";
import Examinee from "./pages/examinee";

export const appRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute subject={"ExamPlaceManagement"} />}>
          <Route path="examplace-management" element={<Examplace />}></Route>
        </Route>
        <Route element={<ProtectedRoute subject={"ExamManagement"} />}>
          <Route path="exam-management" element={<Exam />}></Route>
        </Route>
        <Route element={<ProtectedRoute subject={"ExamineeManagement"} />}>
          <Route path="examinee-management" element={<Examinee />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoute} />
    </Provider>
  );
}

export default App;
