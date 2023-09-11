import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import '@fontsource-variable/nunito';
import { useContext, useState, useEffect } from "react";

const theme = extendTheme({
  fonts: {
    body: "Nunito Variable, sans-serif",
    heading: "Nunito Variable, sans-serif",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false, // This ensures that the color mode is always dark regardless of system settings
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ColorModeScript initialColorMode="dark" />
      <IconContext.Provider value={{ className: "global-class-name" }}>
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
      </IconContext.Provider>
    </>
  );
}

export default MyApp;
