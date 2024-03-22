import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useNumberInput, HStack } from "@chakra-ui/react";

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

  const savings = income * (savingsRate / 100);
  const yearsToRetire = Math.log(25) / Math.log(1 + investmentReturn / 100) / (savingsRate / 100);

  return (
    <Box p={8} maxWidth="600px" mx="auto">
      <Heading as="h1" size="2xl" mb={4}>
        💰 Frugal Retirement Calculator
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
        <Text>You are saving ${savings.toLocaleString()} per year</Text>
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

      <Box>
        <Heading as="h2" size="xl" mb={4}>
          You can retire in {Math.floor(yearsToRetire)} years
        </Heading>
        <Text fontSize="lg">
          With a {savingsRate}% savings rate, {withdrawalRate}% withdrawal rate, and {investmentReturn}% investment return, you will be able to retire in about {Math.floor(yearsToRetire)} years.
        </Text>
      </Box>
    </Box>
  );
};

export default Index;
