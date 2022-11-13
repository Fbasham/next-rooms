import "../styles/globals.css";
import { RoomProvider } from "../contexts/RoomContext";

function MyApp({ Component, pageProps }) {
  return (
    <RoomProvider>
      <Component {...pageProps} />
    </RoomProvider>
  );
}

export default MyApp;
