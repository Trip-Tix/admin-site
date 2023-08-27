import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import '@fontsource-variable/nunito';
import { useContext, useState, useEffect } from "react";

const theme = extendTheme({
  fonts: {
    body: "Nunito Variable, sans-serif",
    heading: "Nunito Variable, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider value={{ className: "global-class-name" }}>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </IconContext.Provider>
  );
}

export default MyApp;
