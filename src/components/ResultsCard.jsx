import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const ResultsCard = ({ yearsToRetire, savingsRate, withdrawalRate, investmentReturn }) => {
  return (
    <Box mt={8} p={8} bg="#3B3B3B" color="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        You'll retire in{" "}
        <Text as="span" color="#32CD32">
          {Math.floor(yearsToRetire)}
        </Text>{" "}
        years! 🥳
      </Heading>
      <Text fontSize="lg">
        With a {savingsRate}% savings rate, {withdrawalRate}% withdrawal rate, and {investmentReturn}% investment return, you will be able to retire in about {Math.floor(yearsToRetire)} years.
      </Text>
    </Box>
  );
};

export default ResultsCard;