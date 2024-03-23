import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useNumberInput, HStack } from "@chakra-ui/react";
import ResultsCard from "../components/ResultsCard";

const Index = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1500);

  const [savingsRate, setSavingsRate] = useState(Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100));

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

  const monthlySavings = monthlyIncome * (savingsRate / 100);
  const yearsToRetire = Math.log(25) / Math.log(1 + investmentReturn / 100);

  const totalSavingsAtRetirement = monthlySavings * 12 * ((Math.pow(1 + investmentReturn / 100, yearsToRetire) - 1) / (investmentReturn / 100));
  const monthlySpending = totalSavingsAtRetirement / yearsToRetire / 12;

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
        <Text mb={2}>Monthly Income</Text>
        <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
      </Box>

      <Box mb={4}>
        <Text mb={2}>Monthly Expenses: ${monthlyExpenses.toLocaleString()}</Text>
      </Box>

      <Box mb={8}>
        <Text mb={2}>Savings Rate: {savingsRate}%</Text>
        <Slider
          value={savingsRate}
          min={0}
          max={100}
          step={1}
          onChange={(val) => {
            setSavingsRate(val);
            setMonthlyExpenses(monthlyIncome * (1 - val / 100));
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>
          With monthly expenses of ${monthlyExpenses.toLocaleString()}, you are saving ${monthlySavings.toLocaleString()} per month.
        </Text>
      </Box>

      <Box mb={8}>
        <Text mb={2}>Investment Return: {investmentReturn}%</Text>
        <HStack>
          <Slider value={investmentReturn} min={0} max={100} step={1} onChange={(val) => setInvestmentReturn(val)}>
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
