import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useNumberInput, HStack } from "@chakra-ui/react";
import ResultsCard from "../components/ResultsCard";

const Index = () => {
  const [income, setIncome] = useState(50000);

  const [savingsRate, setSavingsRate] = useState(50);

  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [investmentReturn, setInvestmentReturn] = useState(7);

  const { getInputProps: getWithdrawalInputProps } = useNumberInput({
    step: 0.1,
    defaultValue: 4,
    min: 2,
    max: 6,
    precision: 1,
    value: withdrawalRate,
    onChange: (val) => setWithdrawalRate(val),
  });

  const { getInputProps: getReturnInputProps } = useNumberInput({
    step: 0.1,
    defaultValue: 7,
    min: 2,
    max: 12,
    precision: 1,
    value: investmentReturn,
    onChange: (val) => setInvestmentReturn(val),
  });

  const expenses = income * (1 - savingsRate / 100);
  const savings = income - expenses;
  const yearsToRetire = Math.log(1 + withdrawalRate / (savingsRate / 100)) / Math.log(1 + investmentReturn / 100);

  const totalSavingsAtRetirement = savings * ((Math.pow(1 + investmentReturn / 100, yearsToRetire) - 1) / (investmentReturn / 100));
  const monthlySpending = (totalSavingsAtRetirement * (withdrawalRate / 100)) / 12;

  return (
    <Box p={8} maxWidth="600px" mx="auto" bg="white" borderRadius="md" boxShadow="md" mt={8}>
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        When will I retire?💰
      </Heading>
      <Text fontSize="xl" mb={8}>
        See how long until you can retire based on your income, expenses and savings rate. Adjust the settings for your specific situation.
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

      <Box mb={8} p={4} border="1px" borderColor="gray.200" rounded="md">
        <Text fontSize="lg" mb={4}>
          Advanced Settings
        </Text>
        <HStack mb={4}>
          <Text>Withdrawal Rate (%):</Text>
          <Input {...getWithdrawalInputProps()} width="100px" />
        </HStack>
        <HStack>
          <Text>Investment Return (%):</Text>
          <Input {...getReturnInputProps()} width="100px" />
        </HStack>
      </Box>

      <ResultsCard yearsToRetire={yearsToRetire} savingsRate={savingsRate} withdrawalRate={withdrawalRate} investmentReturn={investmentReturn} monthlySpending={monthlySpending} />
    </Box>
  );
};

export default Index;
