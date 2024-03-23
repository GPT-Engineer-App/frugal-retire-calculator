import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const ResultsCard = ({ yearsToRetire, savingsRate, investmentReturn, monthlySpending, monthlySavings, totalSavingsAtRetirement }) => {
  return (
    <Box mt={8} p={8} bg="#3B3B3B" color="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4} textAlign="center" fontFamily="Inter">
        You'll retire in{" "}
        <Text as="span" color="green.500">
          {Math.floor(yearsToRetire)}
        </Text>{" "}
        years! 🥳
      </Heading>
      <Text fontSize="lg" mb={2}>
        Woah, your total savings at retirement will be{" "}
        <Text as="span" fontWeight="bold">
          ${totalSavingsAtRetirement.toLocaleString()}
        </Text>
        !
      </Text>
      <Text fontSize="lg">
        Get ready to spend a whopping{" "}
        <Text as="span" fontWeight="bold">
          ${monthlySpending.toLocaleString()}
        </Text> each month.
      </Text>
    </Box>
  );
};

export default ResultsCard;
