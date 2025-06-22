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
  Collapse,
} from '@chakra-ui/react';
import { 
  InfoIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  StarIcon,
  SunIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
  RadialBarChart,
  RadialBar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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

// Add new types for DLP and Topic Classification
interface DLPCategory {
  name: string;
  items: { name: string; enabled: boolean; }[];
}

interface TopicClassification {
  name: string;
  enabled: boolean;
  action: 'Allow' | 'Monitor' | 'Block';
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
  dlpCategories?: DLPCategory[];
  topicClassifications?: TopicClassification[];
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

// Add sample data for the violation distribution charts
const dlpViolationData = [
  { name: 'PII', violations: 450, industryAvg: 380 },
  { name: 'Secrets', violations: 280, industryAvg: 320 },
];

const topicDistributionData = [
  { name: 'Company Financial', current: 25, industryAvg: 22 },
  { name: 'Human Resource', current: 20, industryAvg: 18 },
  { name: 'Legal', current: 15, industryAvg: 20 },
  { name: 'Health and Medical', current: 18, industryAvg: 15 },
  { name: 'Code Assistant', current: 22, industryAvg: 25 },
];

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
  {
    title: 'Protecting and Monitoring Sensitive Data',
    description: 'Define which data protection mechanism to apply to your AI services in your organization',
    dlpCategories: [
      {
        name: 'PII',
        items: [
          { name: 'Email', enabled: true },
          { name: 'Credit Card', enabled: true },
          { name: 'SSN', enabled: true },
          { name: 'ID', enabled: true }
        ]
      },
      {
        name: 'Secrets',
        items: [
          { name: 'Access Tokens', enabled: true },
          { name: 'API-Keys', enabled: true }
        ]
      }
    ],
    topicClassifications: [
      { name: 'Company Financial', enabled: true, action: 'Monitor' },
      { name: 'Human Resource', enabled: true, action: 'Monitor' },
      { name: 'Legal', enabled: true, action: 'Block' },
      { name: 'Health and Medical', enabled: true, action: 'Block' },
      { name: 'Code Assistant', enabled: true, action: 'Allow' }
    ]
  }
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

// Sample data for access methods with more meaningful patterns
const accessMethodsData = [
  // Code Generation: Strong Browser, good Native App, significant API
  { name: 'Code Generation', accessMethod: 'Browser Access', users: 2000 },
  { name: 'Code Generation', accessMethod: 'Native App', users: 1500 },
  { name: 'Code Generation', accessMethod: 'API', users: 1200 },
  
  // Conversation: Strong Browser, good Native App, moderate API
  { name: 'Conversation', accessMethod: 'Browser Access', users: 2200 },
  { name: 'Conversation', accessMethod: 'Native App', users: 1600 },
  { name: 'Conversation', accessMethod: 'API', users: 800 },
  
  // Productivity: Browser dominant, moderate Native App, low API
  { name: 'Productivity', accessMethod: 'Browser Access', users: 1800 },
  { name: 'Productivity', accessMethod: 'Native App', users: 1000 },
  { name: 'Productivity', accessMethod: 'API', users: 300 },
  
  // Grammar: Browser dominant, some Native App, minimal API
  { name: 'Grammar', accessMethod: 'Browser Access', users: 1600 },
  { name: 'Grammar', accessMethod: 'Native App', users: 800 },
  { name: 'Grammar', accessMethod: 'API', users: 200 },
  
  // Healthcare: Browser dominant, good Native App presence
  { name: 'Healthcare', accessMethod: 'Browser Access', users: 1500 },
  { name: 'Healthcare', accessMethod: 'Native App', users: 900 },
  { name: 'Healthcare', accessMethod: 'API', users: 300 },
  
  // Media: Strong Browser focus, moderate Native App
  { name: 'Media', accessMethod: 'Browser Access', users: 1400 },
  { name: 'Media', accessMethod: 'Native App', users: 700 },
  { name: 'Media', accessMethod: 'API', users: 200 },
  
  // Travel: Browser-centric, good Native App support
  { name: 'Travel', accessMethod: 'Browser Access', users: 1300 },
  { name: 'Travel', accessMethod: 'Native App', users: 800 },
  { name: 'Travel', accessMethod: 'API', users: 250 },
  
  // Business: Browser dominant, moderate Native App
  { name: 'Business', accessMethod: 'Browser Access', users: 1700 },
  { name: 'Business', accessMethod: 'Native App', users: 900 },
  { name: 'Business', accessMethod: 'API', users: 300 }
];

// Transform data for the circular network visualization
const transformedAccessData = (() => {
  const useCases = Array.from(new Set(accessMethodsData.map(d => d.name)));
  return useCases.map(useCase => {
    const methods = accessMethodsData
      .filter(d => d.name === useCase)
      .reduce((acc, curr) => {
        acc[curr.accessMethod] = curr.users;
        return acc;
      }, {} as Record<string, number>);
    
    return {
      name: useCase,
      "Browser Access": methods["Browser Access"] || 0,
      "Native App": methods["Native App"] || 0,
      "API": methods["API"] || 0,
      total: Object.values(methods).reduce((a, b) => a + b, 0)
    };
  }).sort((a, b) => b.total - a.total);
})();

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [configurations, setConfigurations] = useState<{ [key: string]: boolean }>({});
  const [aiAppConfigs, setAiAppConfigs] = useState<{ [key: string]: { enabled: boolean, licenseType: LicenseType } }>({});
  const [accessConfigs, setAccessConfigs] = useState<{ [key: string]: { enabled: boolean, accessMethods: AccessMethod[] } }>({});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    Development: true,
    Communication: true,
    Business: true,
    Other: true,
    DLP: true,
    Topics: true
  });

  // Add toggle function for sections
  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

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

  const handleAccessMethodToggle = (useCaseName: string, method: AccessMethod) => {
    setAccessConfigs(prev => {
      const currentMethods = prev[useCaseName]?.accessMethods || [];
      const newMethods = currentMethods.includes(method)
        ? currentMethods.filter(m => m !== method)
        : [...currentMethods, method];
      
      return {
        ...prev,
        [useCaseName]: {
          ...prev[useCaseName],
          accessMethods: newMethods,
          enabled: prev[useCaseName]?.enabled ?? true
        }
      };
    });
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
      const methodCounts = accessMethodsData.reduce((acc, d) => {
        acc[d.accessMethod as AccessMethod] += d.users;
        return acc;
      }, {
        'Browser Access': 0,
        'Native App': 0,
        'API': 0
      } as Record<AccessMethod, number>);

      const totalUsers = Object.values(methodCounts).reduce((sum, count) => sum + count, 0);
      
      // Calculate percentages for Code Generation and Conversation API usage
      const codeGenApiUsers = accessMethodsData.find(d => d.name === 'Code Generation' && d.accessMethod === 'API')?.users || 0;
      const convApiUsers = accessMethodsData.find(d => d.name === 'Conversation' && d.accessMethod === 'API')?.users || 0;
      const totalApiDevUsers = codeGenApiUsers + convApiUsers;
      
      return [
        `Browser Access is the dominant access method in your organization, with high significance across all use cases (${Math.round((methodCounts['Browser Access']/totalUsers)*100)}% of total usage). This indicates strong preference for web-based AI interfaces.`,
        `Native App adoption follows as the second most popular method (${Math.round((methodCounts['Native App']/totalUsers)*100)}% of total usage), showing particularly strong presence in Code Generation and Conversation use cases.`,
        `API consumption is primarily concentrated in development-focused categories, with Code Generation (${Math.round((codeGenApiUsers/totalApiDevUsers)*100)}%) and Conversation (${Math.round((convApiUsers/totalApiDevUsers)*100)}%) leading API usage. In these categories, Cursor AI accounts for 82% of API calls, followed by ChatGPT at 18%.`,
      ];
    }

    if (currentStep === 4) { // Data Protection step
      return [
        'Your organization shows 18% higher PII detection rate compared to industry average, suggesting robust data protection practices.',
        'Code Assistant topics show lower blocking rates than industry average (15% vs 25%). Consider reviewing policies for sensitive code handling.',
        'Health and Medical data blocking is aligned with compliance requirements, showing 20% higher protection than industry benchmark.',
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
                    <VStack spacing={6} align="stretch" flex={1}>
                      {['Development', 'Communication', 'Business', 'Other'].map(category => {
                        const categoryUseCases = steps[currentStep].useCaseAccess?.filter(useCase => {
                          if (category === 'Development') return ['Code Generation'].includes(useCase.name);
                          if (category === 'Communication') return ['Conversation', 'Grammar'].includes(useCase.name);
                          if (category === 'Business') return ['Productivity', 'Business'].includes(useCase.name);
                          return ['Healthcare', 'Media', 'Travel'].includes(useCase.name);
                        });

                        if (!categoryUseCases?.length) return null;

                        return (
                          <Box key={category} borderWidth="1px" borderRadius="lg" p={4}>
                            <HStack justify="space-between" cursor="pointer" onClick={() => toggleSection(category)}>
                              <Heading size="sm" color="gray.700">{category}</Heading>
                              <Icon 
                                as={expandedSections[category] ? ChevronUpIcon : ChevronDownIcon}
                                color="gray.500"
                              />
                            </HStack>
                            <Collapse in={expandedSections[category] ?? true}>
                              <VStack align="stretch" mt={4} spacing={4}>
                                {categoryUseCases.map((useCase) => (
                                  <VStack key={useCase.name} align="stretch" spacing={2}>
                                    <HStack justify="space-between">
                                      <HStack>
                                        <Text fontSize="md">{useCase.name}</Text>
                                        <Tooltip label={useCase.tooltip} placement="top">
                                          <Icon as={InfoIcon} color="gray.400" />
                                        </Tooltip>
                                      </HStack>
                                      <Switch
                                        colorScheme="green"
                                        defaultChecked={useCase.default}
                                        onChange={() => handleToggle(useCase.name)}
                                      />
                                    </HStack>
                                    <Box pl={4}>
                                      <Text fontSize="sm" color="gray.600" mb={2}>Access Methods:</Text>
                                      <SimpleGrid columns={3} spacing={4}>
                                        {(['Browser Access', 'Native App', 'API'] as AccessMethod[]).map((method) => (
                                          <HStack key={method}>
                                            <Switch
                                              size="sm"
                                              colorScheme="green"
                                              isChecked={accessConfigs[useCase.name]?.accessMethods?.includes(method) ?? false}
                                              onChange={() => handleAccessMethodToggle(useCase.name, method)}
                                            />
                                            <Text fontSize="sm">{method}</Text>
                                          </HStack>
                                        ))}
                                      </SimpleGrid>
                                    </Box>
                                  </VStack>
                                ))}
                              </VStack>
                            </Collapse>
                          </Box>
                        );
                      })}
                    </VStack>
                  </Stack>
                )}

                {currentStep === 4 && (
                  <Stack direction="row" spacing={8} align="start" pt={4}>
                    <VStack spacing={6} align="stretch" flex={1}>
                      {/* DLP Section */}
                      <Box borderWidth="1px" borderRadius="lg" p={4}>
                        <HStack justify="space-between" cursor="pointer" onClick={() => toggleSection('DLP')}>
                          <Heading size="sm" color="gray.700">Data Loss Prevention</Heading>
                          <Icon 
                            as={expandedSections['DLP'] ? ChevronUpIcon : ChevronDownIcon}
                            color="gray.500"
                          />
                        </HStack>
                        <Collapse in={expandedSections['DLP'] ?? true}>
                          <VStack align="stretch" mt={4} spacing={4}>
                            {steps[currentStep].dlpCategories?.map((category) => (
                              <Box key={category.name}>
                                <Text fontWeight="bold" mb={2}>{category.name}</Text>
                                <SimpleGrid columns={4} spacing={4}>
                                  {category.items.map((item) => (
                                    <HStack key={item.name}>
                                      <Switch
                                        size="sm"
                                        colorScheme="green"
                                        defaultChecked={item.enabled}
                                      />
                                      <Text fontSize="sm">{item.name}</Text>
                                    </HStack>
                                  ))}
                                </SimpleGrid>
                              </Box>
                            ))}
                          </VStack>
                        </Collapse>
                      </Box>

                      {/* Topic Classification Section */}
                      <Box borderWidth="1px" borderRadius="lg" p={4}>
                        <HStack justify="space-between" cursor="pointer" onClick={() => toggleSection('Topics')}>
                          <HStack>
                            <Heading size="sm" color="gray.700">Topic Classification</Heading>
                            <Tooltip label="Currently support only Chat Assistant">
                              <Icon as={InfoIcon} color="gray.400" />
                            </Tooltip>
                          </HStack>
                          <Icon 
                            as={expandedSections['Topics'] ? ChevronUpIcon : ChevronDownIcon}
                            color="gray.500"
                          />
                        </HStack>
                        <Collapse in={expandedSections['Topics'] ?? true}>
                          <VStack align="stretch" mt={4} spacing={4}>
                            {steps[currentStep].topicClassifications?.map((topic) => (
                              <HStack key={topic.name} justify="space-between">
                                <HStack>
                                  <Switch
                                    size="sm"
                                    colorScheme="green"
                                    defaultChecked={topic.enabled}
                                  />
                                  <Text fontSize="sm">{topic.name}</Text>
                                </HStack>
                                <Select
                                  size="sm"
                                  width="120px"
                                  defaultValue={topic.action}
                                  variant="filled"
                                >
                                  <option value="Allow">Allow</option>
                                  <option value="Monitor">Monitor</option>
                                  <option value="Block">Block</option>
                                </Select>
                              </HStack>
                            ))}
                          </VStack>
                        </Collapse>
                      </Box>
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
                        <Box mt={8}>
                          <Box flex={1} h="500px">
                            <Heading size="sm" color="gray.600" mb={8} textAlign="center">
                              AI Use Case Access Methods Distribution
                            </Heading>
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart 
                                cx="50%" 
                                cy="50%" 
                                outerRadius="80%" 
                                data={transformedAccessData}
                              >
                                <Legend 
                                  verticalAlign="top"
                                  align="center"
                                  wrapperStyle={{
                                    paddingBottom: "20px",
                                    fontSize: "14px"
                                  }}
                                />
                                <PolarGrid stroke="#48BB78" strokeOpacity={0.2} />
                                <PolarAngleAxis 
                                  dataKey="name" 
                                  tick={{ 
                                    fill: "#2D3748",
                                    fontSize: 14,
                                    fontWeight: "bold"
                                  }}
                                />
                                <PolarRadiusAxis 
                                  angle={30} 
                                  domain={[0, 'auto']}
                                  tick={{ 
                                    fill: "#718096",
                                    fontSize: 12
                                  }}
                                />
                                <Radar 
                                  name="Browser Access"
                                  dataKey="Browser Access"
                                  stroke="#48BB78"
                                  fill="#48BB78"
                                  fillOpacity={0.5}
                                />
                                <Radar 
                                  name="Native App"
                                  dataKey="Native App"
                                  stroke="#805AD5"
                                  fill="#805AD5"
                                  fillOpacity={0.5}
                                />
                                <Radar 
                                  name="API"
                                  dataKey="API"
                                  stroke="#DD6B20"
                                  fill="#DD6B20"
                                  fillOpacity={0.5}
                                />
                                <RechartsTooltip
                                  content={({ active, payload }) => {
                                    if (!active || !payload || !payload.length) return null;
                                    return (
                                      <Box bg="white" p={2} borderRadius="md" boxShadow="md">
                                        <Text fontWeight="bold">{payload[0].payload.name}</Text>
                                        {payload.map((entry, i) => (
                                          <Text key={i} fontSize="sm">
                                            {entry.name}: {entry.value} users
                                          </Text>
                                        ))}
                                      </Box>
                                    );
                                  }}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </Box>
                        </Box>
                      ) : currentStep === 4 ? (
                        <Box mt={8}>
                          <Heading size="md" color="green.600" mb={6}>
                            Industry Benchmark Comparison
                          </Heading>
                          <SimpleGrid columns={2} spacing={8}>
                            <Box>
                              <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                                DLP Violation Distribution
                              </Heading>
                              <Box height="300px">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={dlpViolationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Bar dataKey="violations" name="Your Organization" fill="#48BB78" />
                                    <Bar dataKey="industryAvg" name="Industry Average" fill="#805AD5" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </Box>
                            </Box>
                            <Box>
                              <Heading size="sm" color="gray.600" mb={4} textAlign="center">
                                Topic Distribution
                              </Heading>
                              <Box height="300px">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={topicDistributionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Legend />
                                    <Bar dataKey="current" name="Your Organization" fill="#48BB78" />
                                    <Bar dataKey="industryAvg" name="Industry Average" fill="#805AD5" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </Box>
                            </Box>
                          </SimpleGrid>
                        </Box>
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