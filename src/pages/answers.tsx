import {
  Box,
  Flex, Table, TableCaption,
  TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { MCQAnswer, Question, QuestionContext } from "../utils/questions";

const Answers: NextPage = () => {
  const { questions } = useContext(QuestionContext);

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

            <TableContainer>
              <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Answers;
