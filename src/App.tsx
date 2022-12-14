
import { Grid } from '@mui/material';
import Dashboard from './pages/dashboard/Dashboard';
import UpdatePage from './pages/update/UpdatePage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StatementPage from './pages/statement/Statement';
import RebalancingPage from './pages/rebalancing/RebalancingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/extrato",
    element: <StatementPage />,
  },
  {
    path: "/atualizacao",
    element: <UpdatePage />,
  },
  {
    path: "/rebalanceamento",
    element: <RebalancingPage />,
  }
]);

function App() {
  return (
    <Grid className="App" container >
      <RouterProvider router={router} />

      {/* <Dashboard /> */}
      {/* <UpdatePage /> */}
    </Grid>
  );
}

export default App;
