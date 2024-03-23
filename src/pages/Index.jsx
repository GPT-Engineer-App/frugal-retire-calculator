import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useNumberInput, HStack } from "@chakra-ui/react";
import ResultsCard from "../components/ResultsCard";

const Index = () => {
  const [income, setIncome] = useState(50000);

  const [savingsRate, setSavingsRate] = useState(50);

  const [investmentReturn, setInvestmentReturn] = useState(9);

  const { getInputProps: getReturnInputProps } = useNumberInput({
    step: 0.1,
    defaultValue: 9,
    min: 2,
    max: 12,
    precision: 1,
    value: investmentReturn,
    onChange: (val) => setInvestmentReturn(val),
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const expenses = income * (1 - savingsRate / 100);
  const savings = income - expenses;
  const yearsToRetire = Math.log(25) / Math.log(1 + investmentReturn / 100);

  const totalSavingsAtRetirement = savings * ((Math.pow(1 + investmentReturn / 100, yearsToRetire) - 1) / (investmentReturn / 100));
  const monthlySpending = (totalSavingsAtRetirement / yearsToRetire) / 12;

  return (
    <Box p={8} maxWidth="600px" mx="auto" bg="white" borderRadius="md" boxShadow="md" mt={8}>
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        When will I retire?💰
      </Heading>
      <Text fontSize="xl" mb={8}>
        See how long until you can retire based on your income, expenses and savings rate.
        <Text fontFamily="'Gloria Hallelujah', cursive" mt={4}>
          Change the settings as you like!
        </Text>
      </Text>

      <Box mb={4}>
        <Text mb={2}>Net Income (Annual)</Text>
        <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
      </Box>

      <Box mb={8}>
        <Text mb={2}>Savings Rate: {savingsRate}%</Text>
        <Slider value={savingsRate} min={0} max={100} step={1} onChange={(val) => setSavingsRate(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>
          With expenses of ${expenses.toLocaleString()} per year, you are saving ${savings.toLocaleString()} per year.
        </Text>
      </Box>

      <Box mb={8}>
        <Text mb={2}>Investment Return: {investmentReturn}%</Text>
        <HStack>
          <Slider value={investmentReturn} min={2} max={12} step={0.1} onChange={(val) => setInvestmentReturn(val)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Input {...getReturnInputProps()} width="100px" />
        </HStack>
      </Box>

      <ResultsCard yearsToRetire={yearsToRetire} savingsRate={savingsRate} investmentReturn={investmentReturn} monthlySpending={monthlySpending} />
    </Box>
  );
};

export default Index;
