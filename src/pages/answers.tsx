import {
  Box,
  Flex, Table,
  Thead,
  Tbody, Tr,
  Th,
  Td, TableContainer
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import Header from "../components/Header";
import { QuestionContext } from "../utils/questions";

const Answers: NextPage = () => {
  const { questions } = useContext(QuestionContext);

  return (
    <>
      <Head>
        <title>UCEED 2023</title>
      </Head>
      <Box>
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
          <Header showTimer={false} />

          <Flex
            maxW="md"
            w="100%"
            m="0 auto"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
            flex={1}>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Section</Th>
                    <Th>Question #</Th>
                    <Th>Answer</Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {questions.map((question, k) => (
                    <Tr key={k}>
                      <Td>{question.section}</Td>
                      <Td>{question.qno}</Td>
                      <Td>{question.answer ? question.answer : 'NOT ANSWERED'}</Td>
                    </Tr>
                  ))}

                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Answers;
