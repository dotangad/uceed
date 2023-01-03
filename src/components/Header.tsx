import React from 'react';
import Head from 'next/head';
import { Flex, Text, Box } from '@chakra-ui/react';

const Header: React.FC<{ showTimer: boolean }> = ({ showTimer }) => {
  return (
    <>
      <Head>
        <title>UCEED 2023</title>
      </Head>
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
        {showTimer &&
          <Box>[[TIMER]]</Box>
        }
      </Flex>
    </>
  );
};

export default Header;