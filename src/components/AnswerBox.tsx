import { Box, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { MCQAnswer, Question, QuestionContext } from "../utils/questions";

const NATAnswer: React.FC<{ question?: Question }> = ({ question }) => {
  const { setSolution } = useContext(QuestionContext);
  return (
    <Box w="100%">
      <Input
        my={4}
        w="100%"
        type="number"
        placeholder="Answer"
        value={question?.answer ?? ""}
        onChange={e => setSolution(question?.qno ?? -1, Number(e.target.value))} />
    </Box>
  );
}

const MSQAnswer: React.FC<{ question?: Question }> = ({ question }) => {
  const { setSolution } = useContext(QuestionContext);

  const nullForEmptyArray = (arr: any) => arr.length === 0 ? null : arr;

  return (
    <Grid
      py={6}
      width="100%"
      rowGap={4}
      columnGap={4}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)">
      {['A', 'B', 'C', 'D'].map((option, k) => (
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="monospace"
          fontSize="4xl"
          fontWeight="bold"
          height="100px"
          bg={
            // @ts-ignore
            question?.answer?.includes(option)
              ? "blue.300"
              : "gray.200"
          }
          onClick={() => setSolution(
            question?.qno ?? -1,
            // @ts-ignore
            Array.isArray(question?.answer)
              // @ts-ignore
              ? question?.answer.includes(option)
                // @ts-ignore
                ? nullForEmptyArray(question?.answer.filter((a: string) => a !== option))
                // @ts-ignore
                : [...question?.answer, option]
              : [option]
          )}
          cursor="pointer"
          key={k}>
          {option}
        </GridItem>
      ))}
    </Grid>
  );
}

const MCQAnswer: React.FC<{ question?: Question }> = ({ question }) => {
  const { setSolution } = useContext(QuestionContext);

  return (
    <Grid
      py={6}
      width="100%"
      rowGap={4}
      columnGap={4}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)">
      {['A', 'B', 'C', 'D'].map((option, k) => (
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="monospace"
          fontSize="4xl"
          fontWeight="bold"
          height="100px"
          bg={question?.answer === option ? "blue.300" : "gray.200"}
          onClick={() => setSolution(question?.qno ?? -1, option as MCQAnswer)}
          cursor="pointer"
          key={k}>
          {option}
        </GridItem>
      ))}
    </Grid>
  );
}

const AnswerBox: React.FC = () => {
  const { questions, currentQIdx } = useContext(QuestionContext);

  return (
    <>
      <Flex
        maxW="md"
        w="100%"
        m="0 auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={4}
        flex={1}>
        <Text fontSize="3xl" fontWeight="bold">Question {currentQIdx + 1}</Text>
        {questions[currentQIdx]?.section === 'NAT'
          ? <NATAnswer question={questions[currentQIdx]} />
          : questions[currentQIdx]?.section === 'MSQ'
            ? <MSQAnswer question={questions[currentQIdx]} />
            : <MCQAnswer question={questions[currentQIdx]} />
        }
      </Flex>
    </>
  );
};

export default AnswerBox;
