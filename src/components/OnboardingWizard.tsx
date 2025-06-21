import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Progress,
  Stack,
  Text,
  Switch,
  Tooltip,
  Divider,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MotionBox = motion(Box);

// Sample data for charts
const pieData = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 35 },
];

const barData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 40 },
];

const COLORS = ['#48BB78', '#9AE6B4', '#68D391', '#C6F6D5'];

interface Step {
  title: string;
  description: string;
  configurations?: {
    name: string;
    tooltip: string;
    default: boolean;
  }[];
}

const steps: Step[] = [
  {
    title: 'Welcome to Organization Setup',
    description: 'Welcome to our organization setup wizard! This guide will help you configure your organization\'s settings and preferences. We\'ll walk you through important decisions and show you relevant data to help make informed choices.',
  },
  {
    title: 'Security Settings',
    description: 'Configure your organization\'s security settings. These settings will determine how users authenticate and what security measures are in place to protect your data.',
    configurations: [
      {
        name: 'Enable Two-Factor Authentication',
        tooltip: 'Requires users to provide a second form of verification when logging in',
        default: true,
      },
      {
        name: 'Enforce Password Rotation',
        tooltip: 'Requires users to change their password every 90 days',
        default: false,
      },
      {
        name: 'Allow Single Sign-On',
        tooltip: 'Enable authentication through your organization\'s identity provider',
        default: true,
      },
    ],
  },
  {
    title: 'Data Management',
    description: 'Set up how your organization handles data retention and backup policies. These settings will affect how long data is stored and how it\'s protected.',
    configurations: [
      {
        name: 'Automatic Backups',
        tooltip: 'Create daily backups of all organization data',
        default: true,
      },
      {
        name: 'Data Encryption at Rest',
        tooltip: 'Encrypt all stored data using industry-standard algorithms',
        default: true,
      },
      {
        name: 'Enable Data Analytics',
        tooltip: 'Collect and analyze usage data to improve system performance',
        default: false,
      },
    ],
  },
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [configurations, setConfigurations] = useState<{ [key: string]: boolean }>({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Wizard cancelled');
  };

  const handleToggle = (configName: string) => {
    setConfigurations(prev => ({
      ...prev,
      [configName]: !prev[configName],
    }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      width="1000px"
      minHeight="800px"
      boxShadow="xl"
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
    >
      <Box bg="green.500" color="white" p={6}>
        <Heading size="lg">Organization Setup</Heading>
        <Box mt={4}>
          <Progress
            value={progress}
            size="sm"
            colorScheme="green"
            bg="green.600"
            borderRadius="full"
          />
        </Box>
      </Box>

      <Box p={8} minH="600px">
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color="green.600">
                {steps[currentStep].title}
              </Heading>
              
              <Text fontSize="lg" color="gray.600">
                {steps[currentStep].description}
              </Text>

              {steps[currentStep].configurations && (
                <VStack spacing={4} align="stretch" pt={4}>
                  {steps[currentStep].configurations.map((config) => (
                    <HStack key={config.name} justify="space-between">
                      <HStack>
                        <Text fontSize="md">{config.name}</Text>
                        <Tooltip label={config.tooltip} placement="top">
                          <Icon as={InfoIcon} color="gray.400" />
                        </Tooltip>
                      </HStack>
                      <Switch
                        colorScheme="green"
                        defaultChecked={config.default}
                        onChange={() => handleToggle(config.name)}
                      />
                    </HStack>
                  ))}
                </VStack>
              )}

              {currentStep > 0 && (
                <>
                  <Divider my={6} borderColor={borderColor} />
                  
                  <Box>
                    <Heading size="md" color="green.600" mb={6}>
                      What's happening in my organization?
                    </Heading>
                    
                    <HStack spacing={8} align="start">
                      <Box flex={1} h="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                      
                      <Box flex={1} h="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#48BB78" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </HStack>
                  </Box>
                </>
              )}
            </VStack>
          </MotionBox>
        </AnimatePresence>
      </Box>

      <Box
        borderTop="1px"
        borderColor={borderColor}
        p={6}
        display="flex"
        justifyContent="space-between"
      >
        {currentStep === 0 ? (
          <>
            <Button
              onClick={handleCancel}
              variant="ghost"
              colorScheme="red"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              colorScheme="green"
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handlePrevious}
              variant="ghost"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              colorScheme="green"
              isDisabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingWizard; 