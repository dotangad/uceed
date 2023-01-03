import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { QuestionContext } from "../utils/questions";

const QuestionMap: React.FC = () => {
  const {
    questions,
    currentQIdx,
    setCurrentQIdx,
    canNextQuestion,
    canPrevQuestion,
    nextQuestion,
    prevQuestion,
    setSolution,
    clearAll
  } = useContext(QuestionContext);

  return (
    <>
      <Flex
        borderTop="2px solid"
        borderTopColor="gray.200"
        py={3}
        width="100%"
        justifyContent="space-between"
        alignItems="center">
        <Button
          colorScheme="blue"
          onClick={() => prevQuestion()}
          disabled={!canPrevQuestion()}>
          Prev
        </Button>
        {questions[currentQIdx]?.section === "MSQ" || questions[currentQIdx]?.section === "MCQ" ? (
          <Button
            colorScheme="blue"
            onClick={() => setSolution(currentQIdx + 1)}>
            Clear
          </Button>
        ) : <></>}
        <Button
          colorScheme="blue"
          onClick={() => nextQuestion()}
          disabled={!canNextQuestion()}>
          Next
        </Button>
      </Flex>
      <Flex
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
                  onClick={() => setCurrentQIdx(question.qno - 1)}
                  alignItems="center"
                  justifyContent="center"
                  border={currentQIdx === question.qno - 1 ? "2px solid" : "none"}
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
      <Flex justifyContent="center" py={4}>
        <Button colorScheme="blue" onClick={() => {
          clearAll()
        }}>Clear All</Button>
      </Flex>
    </>
  );
};

export default QuestionMap;
