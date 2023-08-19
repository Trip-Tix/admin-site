import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import "@fontsource/rajdhani";
import { useContext, useState } from "react";
import { UserInfoContext } from "@public/common/context";

const theme = extendTheme({
  fonts: {
    body: "Rajdhani, sans-serif",
    heading: "Rajdhani, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");

  return (
    <IconContext.Provider value={{ className: "global-class-name" }}>
      <ChakraProvider theme={theme}>
        <UserInfoContext.Provider
          value={{
            username,
            setUsername,
            isLogin,
            setIsLogin,
            userToken,
            setUserToken,
          }}
        >
          <Component {...pageProps} />
        </UserInfoContext.Provider>
      </ChakraProvider>
    </IconContext.Provider>
  );
}

export default MyApp;
