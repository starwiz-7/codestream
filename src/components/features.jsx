import {
  Box,
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { FcCheckmark } from 'react-icons/fc';

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  };
});

export default function GridListWithHeading() {
  return (
    <Box p={4} mt={10}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <chakra.h1 fontSize={48} fontWeight={'bold'}>
          Features
        </chakra.h1>
        <Text color={'gray.600'} fontSize={'xl'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map(feature => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={FcCheckmark} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
