import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import BookingContext from "./contexts/BookingContext";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <BookingContext>
            <RouterProvider router={router} />
            <Toaster />
          </BookingContext>
        </AuthContext>
      </QueryClientProvider>
    </div>
  );
}

export default App;
