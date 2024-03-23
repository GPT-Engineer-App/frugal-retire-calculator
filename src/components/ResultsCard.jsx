import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const ResultsCard = ({ yearsToRetire }) => {
  return (
    <Box mt={8} p={8} bg="#3B3B3B" color="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4} textAlign="center" fontFamily="Inter">
        You'll retire in{" "}
        <Text as="span" color="green.500">
          {Math.floor(yearsToRetire)}
        </Text>{" "}
        years! 🥳
      </Heading>
    </Box>
  );
};

export default ResultsCard;
