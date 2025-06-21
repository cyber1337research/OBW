import { Box, useColorModeValue } from '@chakra-ui/react';
import OnboardingWizard from './components/OnboardingWizard';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box
      minH="100vh"
      w="100vw"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <OnboardingWizard />
    </Box>
  );
}

export default App;
