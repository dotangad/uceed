import { Box, Flex } from "@chakra-ui/react";
import { type NextPage } from "next";
import AnswerBox from "../components/AnswerBox";
import Header from "../components/Header";
import QuestionMap from "../components/QuestionMap";

const Home: NextPage = () => {
  return (
    <>
      <Box bg="gray.100" width="100%" height="100%">
        <Flex
          flexDir="column"
          alignItems="stretch"
          justifyContent="space-between"
          color="gray.800"
          p="20px 10px"
          m="0 auto"
          maxWidth="2xl"
          width="100%"
          height="100%">
          <Header showTimer={true} />

          <AnswerBox />

          <QuestionMap />
        </Flex>
      </Box>
    </>
  );
};

export default Home;
