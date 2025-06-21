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
  IconButton,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { InfoIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
import { BsSparkle } from 'react-icons/bs';
import { AiOutlineBulb } from 'react-icons/ai';

const MotionBox = motion(Box);

// Sample data for charts
const pieData = [
  { name: 'Code Generation', value: 30 },
  { name: 'Conversation', value: 25 },
  { name: 'Productivity', value: 15 },
  { name: 'Grammar', value: 10 },
  { name: 'Healthcare', value: 8 },
  { name: 'Media', value: 5 },
  { name: 'Travel', value: 4 },
  { name: 'Business', value: 3 },
];

const barData = [
  { name: 'Code Gen', users: 1200 },
  { name: 'Chat', users: 1000 },
  { name: 'Prod', users: 800 },
  { name: 'Grammar', users: 600 },
  { name: 'Health', users: 400 },
  { name: 'Media', users: 300 },
  { name: 'Travel', users: 200 },
  { name: 'Business', users: 150 },
];

const COLORS = ['#48BB78', '#38A169', '#2F855A', '#276749', '#22543D', '#1C4532', '#133C2D', '#0C2921'];

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
    title: 'Welcome to Organization AI Security Setup',
    description: 'Welcome to the AI Security Setup Wizard\n\n' +
      'This guided setup will help you configure your organization\'s AI usage policies to maximize both security and compliance.\n\n' +
      'We\'ll walk you through key decisions and provide real-time insights based on your organization\'s actual AI usage.\n\n' +
      'Let\'s make data-informed choices together.',
  },
  {
    title: 'Select Approved AI Use Cases',
    description: 'Choose the AI use-cases your organization will allow. These preferences help us tailor AI security settings to your actual business needs.',
    // your organization\'s security settings. These settings will determine how users authenticate and what security measures are in place to protect your data.',
    configurations: [
      {
        name: 'Code Generation',
        tooltip: 'Code generation is the process of using AI to generate code for a given task. This is a common use-case for AI and is often used to generate code for a given task.',
        default: true,
      },
      {
        name: 'Conversation',
        tooltip: 'Conversation is the process of using AI to have a conversation with a user. This is a common use-case for AI and is often used to have a conversation with a user.',
        default: true,
      },
      {
        name: 'Productivity',
        tooltip: 'Productivity is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Grammar',
        tooltip: 'Grammar is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Healthcare',
        tooltip: 'Healthcare is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Media',
        tooltip: 'Media is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Travel',
        tooltip: 'Travel is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Business',
        tooltip: 'Business is the process of using AI to help with tasks that are repetitive and time-consuming. This is a common use-case for AI and is often used to help with tasks that are repetitive and time-consuming.',
        default: false,
      }
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
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

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
  const sidePanelBg = useColorModeValue('gray.50', 'gray.700');

  const getRecommendations = () => {
    const totalUsers = barData.reduce((sum, item) => sum + item.users, 0);
    const topUseCase = barData.reduce((prev, current) => 
      (prev.users > current.users) ? prev : current
    );
    
    return [
      `${topUseCase.name} shows highest adoption with ${Math.round((topUseCase.users/totalUsers)*100)}% of users. Consider prioritizing security measures for this use case.`,
      'Multiple AI use cases are active simultaneously. Implement cross-functional monitoring to prevent data leaks between applications.',
    ];
  };

  return (
    <HStack spacing={0} align="stretch">
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
                
                <Text fontSize="xl" color="gray.600" whiteSpace="pre-line" lineHeight="1.8">
                  {steps[currentStep].description}
                </Text>

                {steps[currentStep].configurations && (
                  <Stack direction="row" spacing={8} align="start" pt={4}>
                    <VStack spacing={4} align="stretch" flex={1}>
                      {steps[currentStep].configurations.slice(0, 4).map((config) => (
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
                    <VStack spacing={4} align="stretch" flex={1}>
                      {steps[currentStep].configurations.slice(4).map((config) => (
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
                  </Stack>
                )}

                {currentStep > 0 && (
                  <>
                    <Divider my={6} borderColor={borderColor} />
                    
                    <Box>
                      <Heading size="md" color="green.600" mb={6}>
                        What's Happening in Your Organization?
                      </Heading>
                      
                      <HStack spacing={8} align="start">
                        <Box flex={1} h="300px">
                          <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                          GenAI Apps in Use (by Category)
                          </Heading>
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
                          <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                          User Engagement per Use Case
                          </Heading>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <RechartsTooltip />
                              <Legend />
                              <Bar dataKey="users" fill="#48BB78" />
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

      {currentStep > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isSidePanelOpen ? "300px" : "40px",
              opacity: 1 
            }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative' }}
          >
            <Box
              height="800px"
              bg={sidePanelBg}
              borderRightRadius="xl"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
            >
              <IconButton
                aria-label="Toggle panel"
                icon={isSidePanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                size="sm"
                variant="solid"
                colorScheme="green"
                zIndex={2}
              />
              
              <AnimatePresence mode="wait">
                {isSidePanelOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box p={6}>
                      <HStack spacing={2} mb={6}>
                        <Icon as={BsSparkle} color="green.500" boxSize={5} />
                        <Heading size="md" color="green.600">
                          AI Tailored Recommendations
                        </Heading>
                      </HStack>
                      
                      <List spacing={4}>
                        {getRecommendations().map((rec, index) => (
                          <ListItem key={index} display="flex" alignItems="flex-start">
                            <ListIcon as={AiOutlineBulb} color="green.500" mt={1} />
                            <Text fontSize="sm" color="gray.600">
                              {rec}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </motion.div>
        </AnimatePresence>
      )}
    </HStack>
  );
};

export default OnboardingWizard; 