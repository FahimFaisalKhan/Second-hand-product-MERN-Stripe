import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <AuthContext>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </AuthContext>
    </div>
  );
}

export default App;
