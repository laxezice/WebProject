import "../styles/globals.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/hide.css";
import "../styles/ColorPicker.css";

import axios from "axios";
import { AuthSession } from "../contexts/Section";
import { CookiesProvider } from "react-cookie";
axios.defaults.baseURL = "https://pr-project-api.herokuapp.com/";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <CookiesProvider>
      <AuthSession>{getLayout(<Component {...pageProps} />)}</AuthSession>
    </CookiesProvider>
  );
}

export default MyApp;
