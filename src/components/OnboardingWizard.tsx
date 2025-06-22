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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';
import { 
  InfoIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  StarIcon,
  SunIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
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
  Sankey,
  Layer,
  Rectangle,
} from 'recharts';

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

type LicenseType = 'Private License Only' | 'Enterprise License Only' | 'Both';

interface AIApplication {
  name: string;
  tooltip: string;
  default: boolean;
  licenseType: LicenseType;
  usageStats: {
    privateLicense: number;
    enterpriseLicense: number;
  };
}

interface Step {
  title: string;
  description: string;
  configurations?: {
    name: string;
    tooltip: string;
    default: boolean;
  }[];
  aiApplications?: AIApplication[];
  useCaseAccess?: {
    name: string;
    tooltip: string;
    default: boolean;
  }[];
}

// Sample data for AI application usage
const aiApplicationData = [
  {
    name: 'ChatGPT',
    tooltip: 'OpenAI\'s ChatGPT for general purpose AI interactions',
    default: true,
    licenseType: 'Both' as LicenseType,
    usageStats: { privateLicense: 800, enterpriseLicense: 1200 }
  },
  {
    name: 'Claude',
    tooltip: 'Anthropic\'s Claude for advanced AI assistance',
    default: true,
    licenseType: 'Enterprise License Only' as LicenseType,
    usageStats: { privateLicense: 300, enterpriseLicense: 900 }
  },
  {
    name: 'Preplexity',
    tooltip: 'Preplexity for specialized AI tasks',
    default: false,
    licenseType: 'Private License Only' as LicenseType,
    usageStats: { privateLicense: 400, enterpriseLicense: 0 }
  },
  {
    name: 'Deepseek',
    tooltip: 'Deepseek for advanced AI research',
    default: false,
    licenseType: 'Both' as LicenseType,
    usageStats: { privateLicense: 200, enterpriseLicense: 300 }
  },
  {
    name: 'Cursor',
    tooltip: 'AI-powered code editor',
    default: true,
    licenseType: 'Enterprise License Only' as LicenseType,
    usageStats: { privateLicense: 100, enterpriseLicense: 700 }
  },
  {
    name: 'M365 Copilot',
    tooltip: 'Microsoft 365 AI assistant',
    default: true,
    licenseType: 'Enterprise License Only' as LicenseType,
    usageStats: { privateLicense: 0, enterpriseLicense: 1500 }
  }
];

// Updated bar data for AI applications
const aiUsageData = aiApplicationData.map(app => ({
  name: app.name,
  privateLicense: app.usageStats.privateLicense,
  enterpriseLicense: app.usageStats.enterpriseLicense,
}));

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
    title: 'Select Approved AI Applications',
    description: 'AI Applications spans across various vendors. Choose what AI apps your organization will allow.',
    aiApplications: aiApplicationData,
  },
  {
    title: 'Access & Consumption Methods',
    description: 'Set up how your organization should access and consume AI services.',
    useCaseAccess: [
      {
        name: 'Code Generation',
        tooltip: 'Code generation is the process of using AI to generate code for a given task.',
        default: true,
      },
      {
        name: 'Conversation',
        tooltip: 'Conversation is the process of using AI to have a conversation with a user.',
        default: true,
      },
      {
        name: 'Productivity',
        tooltip: 'Productivity is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Grammar',
        tooltip: 'Grammar is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Healthcare',
        tooltip: 'Healthcare is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Media',
        tooltip: 'Media is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Travel',
        tooltip: 'Travel is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      },
      {
        name: 'Business',
        tooltip: 'Business is the process of using AI to help with tasks that are repetitive and time-consuming.',
        default: false,
      }
    ],
  },
];

// Calculate total users and adoption metrics
const totalDetectedApps = 1371;
const totalAIUsers = 3688;
const aiAdoptionRate = 66;

// Updated bar chart colors
const LICENSE_COLORS = {
  privateLicense: '#805AD5', // Purple
  enterpriseLicense: '#DD6B20', // Orange
};

type AccessMethod = 'Browser Access' | 'Native App' | 'API';

interface UseCaseAccess {
  name: string;
  tooltip: string;
  default: boolean;
  accessMethod: AccessMethod;
  users: number;
}

// Sample data for access methods
const accessMethodsData = [
  { name: 'Code Generation', accessMethod: 'API', users: 800 },
  { name: 'Code Generation', accessMethod: 'Native App', users: 300 },
  { name: 'Code Generation', accessMethod: 'Browser Access', users: 100 },
  { name: 'Conversation', accessMethod: 'Browser Access', users: 600 },
  { name: 'Conversation', accessMethod: 'Native App', users: 400 },
  { name: 'Productivity', accessMethod: 'Browser Access', users: 500 },
  { name: 'Productivity', accessMethod: 'API', users: 300 },
  { name: 'Grammar', accessMethod: 'Browser Access', users: 400 },
  { name: 'Grammar', accessMethod: 'Native App', users: 200 },
  { name: 'Healthcare', accessMethod: 'API', users: 300 },
  { name: 'Healthcare', accessMethod: 'Native App', users: 100 },
  { name: 'Media', accessMethod: 'Browser Access', users: 200 },
  { name: 'Media', accessMethod: 'API', users: 100 },
  { name: 'Travel', accessMethod: 'Browser Access', users: 150 },
  { name: 'Travel', accessMethod: 'Native App', users: 50 },
  { name: 'Business', accessMethod: 'API', users: 100 },
  { name: 'Business', accessMethod: 'Browser Access', users: 50 },
];

// Prepare Sankey data
const useCaseNodes = Array.from(new Set(accessMethodsData.map(d => d.name)))
  .map((name, index) => ({ name, id: index }));

const accessMethodNodes = Array.from(new Set(accessMethodsData.map(d => d.accessMethod)))
  .map((name, index) => ({ name, id: index + useCaseNodes.length }));

const allNodes = [...useCaseNodes, ...accessMethodNodes];

const sankeyData = {
  nodes: allNodes,
  links: accessMethodsData.map(d => {
    const sourceNode = allNodes.find(n => n.name === d.name);
    const targetNode = allNodes.find(n => n.name === d.accessMethod);
    return {
      source: sourceNode?.id || 0,
      target: targetNode?.id || 0,
      value: d.users,
    };
  }),
};

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [configurations, setConfigurations] = useState<{ [key: string]: boolean }>({});
  const [aiAppConfigs, setAiAppConfigs] = useState<{ [key: string]: { enabled: boolean, licenseType: LicenseType } }>({});
  const [accessConfigs, setAccessConfigs] = useState<{ [key: string]: { enabled: boolean, accessMethod: AccessMethod } }>({});
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
    if (steps[currentStep].configurations) {
      setConfigurations(prev => ({
        ...prev,
        [configName]: !prev[configName],
      }));
    } else if (steps[currentStep].aiApplications) {
      setAiAppConfigs(prev => ({
        ...prev,
        [configName]: {
          ...prev[configName],
          enabled: !prev[configName]?.enabled
        }
      }));
    } else if (steps[currentStep].useCaseAccess) {
      setAccessConfigs(prev => ({
        ...prev,
        [configName]: {
          ...prev[configName],
          enabled: !prev[configName]?.enabled
        }
      }));
    }
  };

  const handleLicenseTypeChange = (appName: string, licenseType: LicenseType) => {
    setAiAppConfigs(prev => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        licenseType
      }
    }));
  };

  const handleAccessMethodChange = (useCaseName: string, accessMethod: AccessMethod) => {
    setAccessConfigs(prev => ({
      ...prev,
      [useCaseName]: {
        ...prev[useCaseName],
        accessMethod
      }
    }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const sidePanelBg = useColorModeValue('gray.50', 'gray.700');

  const getRecommendations = () => {
    if (currentStep === 1) { // Use Cases step
      const totalUsers = barData.reduce((sum, item) => sum + item.users, 0);
      const topUseCase = barData.reduce((prev, current) => 
        (prev.users > current.users) ? prev : current
      );
      
      return [
        `Code Generation leads adoption with ${Math.round((topUseCase.users/totalUsers)*100)}% of users. GitHub Copilot dominates (73%), followed by Cursor AI (25%) and Windsurf (2%).`,
        'Claude-Sonnet 3.5 is your most utilized AI model, with Claude-Sonnet 3.7 showing increasing adoption in recent deployments.',
        'Multiple AI use cases running simultaneously suggests implementing cross-functional monitoring to prevent data leaks between applications.',
      ];
    }

    if (currentStep === 2) { // AI Applications step
      const topApp = aiApplicationData.reduce((prev, current) => 
        (prev.usageStats.privateLicense + prev.usageStats.enterpriseLicense > 
         current.usageStats.privateLicense + current.usageStats.enterpriseLicense) ? prev : current
      );
      
      return [
        `${topApp.name} leads adoption with ${topApp.usageStats.privateLicense + topApp.usageStats.enterpriseLicense} total users across both license types.`,
        'Enterprise licenses show higher adoption rates across most AI applications.',
        `Organization-wide AI adoption rate is at ${aiAdoptionRate}% with ${totalAIUsers.toLocaleString()} active users.`,
      ];
    }

    if (currentStep === 3) { // Access Methods step
      const browserUsers = accessMethodsData
        .filter(d => d.accessMethod === 'Browser Access')
        .reduce((sum, d) => sum + d.users, 0);
      const apiUsers = accessMethodsData
        .filter(d => d.accessMethod === 'API')
        .reduce((sum, d) => sum + d.users, 0);
      const nativeUsers = accessMethodsData
        .filter(d => d.accessMethod === 'Native App')
        .reduce((sum, d) => sum + d.users, 0);
      
      const totalUsers = browserUsers + apiUsers + nativeUsers;
      const dominantMethod = Math.max(browserUsers, apiUsers, nativeUsers) === browserUsers 
        ? 'Browser Access' 
        : Math.max(apiUsers, nativeUsers) === apiUsers 
          ? 'API' 
          : 'Native App';
      
      return [
        `${dominantMethod} is the preferred access method with ${Math.round((Math.max(browserUsers, apiUsers, nativeUsers)/totalUsers)*100)}% of total usage.`,
        'Code Generation and Healthcare show strong API usage, while Conversation and Grammar prefer browser-based access.',
        'Consider implementing unified authentication across all access methods to maintain security consistency.',
      ];
    }
    
    return [];
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
        position="relative"
      >
        <Box bg="green.500" color="white" p={6}>
          <HStack justify="space-between" align="center">
            <Box>
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
            {currentStep > 0 && (
              <HStack spacing={2}>
                <Icon as={StarIcon} color="white" boxSize={5} />
                <Button
                  rightIcon={isSidePanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                  size="sm"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  {isSidePanelOpen ? 'Hide' : 'Show'} AI Insights
                </Button>
              </HStack>
            )}
          </HStack>
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

                {steps[currentStep].aiApplications && (
                  <Stack direction="row" spacing={8} align="start" pt={4}>
                    <VStack spacing={4} align="stretch" flex={1}>
                      {steps[currentStep].aiApplications.map((app) => (
                        <HStack key={app.name} justify="space-between">
                          <HStack>
                            <Text fontSize="md">{app.name}</Text>
                            <Tooltip label={app.tooltip} placement="top">
                              <Icon as={InfoIcon} color="gray.400" />
                            </Tooltip>
                          </HStack>
                          <HStack spacing={4}>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                size="sm"
                                variant="outline"
                              >
                                {aiAppConfigs[app.name]?.licenseType || app.licenseType}
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => handleLicenseTypeChange(app.name, 'Private License Only')}>
                                  Private License Only
                                </MenuItem>
                                <MenuItem onClick={() => handleLicenseTypeChange(app.name, 'Enterprise License Only')}>
                                  Enterprise License Only
                                </MenuItem>
                                <MenuItem onClick={() => handleLicenseTypeChange(app.name, 'Both')}>
                                  Both
                                </MenuItem>
                              </MenuList>
                            </Menu>
                            <Switch
                              colorScheme="green"
                              defaultChecked={app.default}
                              onChange={() => handleToggle(app.name)}
                            />
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  </Stack>
                )}

                {steps[currentStep].useCaseAccess && (
                  <Stack direction="row" spacing={8} align="start" pt={4}>
                    <VStack spacing={4} align="stretch" flex={1}>
                      {steps[currentStep].useCaseAccess.map((useCase) => (
                        <HStack key={useCase.name} justify="space-between">
                          <HStack>
                            <Text fontSize="md">{useCase.name}</Text>
                            <Tooltip label={useCase.tooltip} placement="top">
                              <Icon as={InfoIcon} color="gray.400" />
                            </Tooltip>
                          </HStack>
                          <HStack spacing={4}>
                            <Select
                              size="sm"
                              width="200px"
                              value={accessConfigs[useCase.name]?.accessMethod || 'Browser Access'}
                              onChange={(e) => handleAccessMethodChange(useCase.name, e.target.value as AccessMethod)}
                            >
                              <option value="Browser Access">Browser Access</option>
                              <option value="Native App">Native App</option>
                              <option value="API">API</option>
                            </Select>
                            <Switch
                              colorScheme="green"
                              defaultChecked={useCase.default}
                              onChange={() => handleToggle(useCase.name)}
                            />
                          </HStack>
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
                      
                      {currentStep === 1 ? (
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
                      ) : currentStep === 2 ? (
                        <>
                          <SimpleGrid columns={3} spacing={8} mb={6}>
                            <Stat
                              px={4}
                              py={3}
                              bg={useColorModeValue('white', 'gray.700')}
                              shadow="base"
                              rounded="lg"
                              borderColor={borderColor}
                              borderWidth="1px"
                            >
                              <StatLabel fontSize="sm" color="gray.500">Detected AI Apps</StatLabel>
                              <StatNumber color="green.500">{totalDetectedApps.toLocaleString()}</StatNumber>
                              <StatHelpText mb={0}>Total apps</StatHelpText>
                            </Stat>
                            <Stat
                              px={4}
                              py={3}
                              bg={useColorModeValue('white', 'gray.700')}
                              shadow="base"
                              rounded="lg"
                              borderColor={borderColor}
                              borderWidth="1px"
                            >
                              <StatLabel fontSize="sm" color="gray.500">AI Users</StatLabel>
                              <StatNumber color="green.500">{totalAIUsers.toLocaleString()}</StatNumber>
                              <StatHelpText mb={0}>Active users</StatHelpText>
                            </Stat>
                            <Stat
                              px={4}
                              py={3}
                              bg={useColorModeValue('white', 'gray.700')}
                              shadow="base"
                              rounded="lg"
                              borderColor={borderColor}
                              borderWidth="1px"
                            >
                              <StatLabel fontSize="sm" color="gray.500">AI Adoption Rate</StatLabel>
                              <StatNumber color="green.500">{aiAdoptionRate}%</StatNumber>
                              <StatHelpText mb={0}>Organization-wide</StatHelpText>
                            </Stat>
                          </SimpleGrid>
                          <Box flex={1} h="300px">
                            <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                              AI Application Usage by License Type
                            </Heading>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={aiUsageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="privateLicense" name="Private License" fill={LICENSE_COLORS.privateLicense} />
                                <Bar dataKey="enterpriseLicense" name="Enterprise License" fill={LICENSE_COLORS.enterpriseLicense} />
                              </BarChart>
                            </ResponsiveContainer>
                          </Box>
                        </>
                      ) : currentStep === 3 ? (
                        <>
                          <Divider my={6} borderColor={borderColor} />
                          <Box>
                            <Heading size="md" color="green.600" mb={6}>
                              What's Happening in Your Organization?
                            </Heading>
                            <Box flex={1} h="400px">
                              <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                                AI Use Case Access Methods Distribution
                              </Heading>
                              <ResponsiveContainer width="100%" height="100%">
                                <Sankey
                                  data={sankeyData}
                                  node={
                                    <Rectangle
                                      fill="#48BB78"
                                      opacity={0.8}
                                    />
                                  }
                                  link={{
                                    stroke: "#48BB78",
                                    strokeOpacity: 0.2,
                                  }}
                                  nodePadding={50}
                                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                >
                                  <RechartsTooltip content={({ payload }) => {
                                    if (!payload || !payload.length) return null;
                                    const data = payload[0];
                                    return (
                                      <Box bg="white" p={2} borderRadius="md" boxShadow="md">
                                        <Text fontWeight="bold">{data.name}</Text>
                                        <Text>Users: {data.value}</Text>
                                      </Box>
                                    );
                                  }} />
                                </Sankey>
                              </ResponsiveContainer>
                            </Box>
                          </Box>
                        </>
                      ) : null}
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
              width: isSidePanelOpen ? "300px" : "0px",
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
                        <Icon as={StarIcon} color="green.500" boxSize={5} />
                        <Heading size="md" color="green.600">
                          AI Tailored Recommendations
                        </Heading>
                      </HStack>
                      
                      <List spacing={4}>
                        {getRecommendations().map((rec, index) => (
                          <ListItem key={index} display="flex" alignItems="flex-start">
                            <ListIcon as={SunIcon} color="green.500" mt={1} />
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