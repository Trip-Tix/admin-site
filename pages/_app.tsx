import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import '@fontsource/rajdhani';

const theme = extendTheme({
  fonts: {
    body: "Rajdhani, sans-serif",
    heading: "Rajdhani, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider
      value={{className: "global-class-name" }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </IconContext.Provider>
  );
}

export default MyApp;
