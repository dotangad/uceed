import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QuestionProvider } from "../utils/questions";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
