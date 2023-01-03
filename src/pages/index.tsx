import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { Question, QuestionContext } from "../utils/questions";

const Home: NextPage = () => {
  const { questions, setSolution } = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  return (
    <>
      <Head>
        <title>UCEED 2023</title>
      </Head>
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
          <Flex
            py={2}
            borderBottom="2px solid"
            borderBottomColor="gray.200"
            justifyContent="space-between"
            alignItems="center">
            <Text
              fontSize="xl"
              fontWeight="bold">
              UCEED 2023
            </Text>
            <Box>[[TIMER]]</Box>
          </Flex>

          <Flex
            maxW="md"
            w="100%"
            m="0 auto"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
            flex={1}>
            {currentQuestion && (
              <>
                <Text fontSize="3xl" fontWeight="bold">Question {currentQuestion?.qno}</Text>
                {currentQuestion.section === 'NAT'
                  ? (<Box w="100%">
                    <Input
                      my={4}
                      w="100%"
                      type="number"
                      placeholder="Answer"
                      value={currentQuestion.answer ?? ""}
                      onChange={e => setSolution(currentQuestion.qno, Number(e.target.value))} />
                  </Box>)
                  : currentQuestion.section === 'MSQ'
                    ? (<Box></Box>)
                    : (<Box></Box>)}

                <Flex
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center">
                  <Button
                    colorScheme="blue"
                    onClick={() => setCurrentQuestion(questions[currentQuestion.qno - 2])}
                    disabled={!currentQuestion || currentQuestion.qno === 1}>
                    Prev
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => setCurrentQuestion(questions[currentQuestion.qno])}
                    disabled={!currentQuestion || currentQuestion.qno === questions.length}>
                    Next
                  </Button>
                </Flex>
              </>
            )}
          </Flex>

          <Flex
            borderTop="2px solid"
            borderTopColor="gray.200"
            columnGap={2}
            userSelect="none"
            py={4}>
            {['NAT', 'MSQ', 'MCQ'].map((section, k) => (
              <Box key={k}>
                <Text fontWeight="bold" fontSize="lg" color="gray.500" mb={2}>{section}</Text>
                <Flex
                  rowGap={2}
                  columnGap={2}
                  flexWrap="wrap">
                  {questions.filter(({ section: s }) => section === s).map((question, i) => (
                    <Flex
                      h="25px"
                      w="25px"
                      key={i}
                      cursor="pointer"
                      onClick={() => setCurrentQuestion(question)}
                      alignItems="center"
                      justifyContent="center"
                      border={currentQuestion?.qno === question.qno ? "2px solid" : "none"}
                      borderColor="blue.600"
                      bg={question.answer ? "green.300" : "gray.300"}>
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAlign="center">
                        {question.qno}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
