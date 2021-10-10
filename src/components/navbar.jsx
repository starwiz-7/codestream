import {
  chakra,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
export default function WithSubnavigation() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 2 }}
        // borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ md: 'start' }}>
          <chakra.h1
            // textAlign={useBreakpointValue({ md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Codestream
          </chakra.h1>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <ColorModeSwitcher />
        </Stack>
      </Flex>
    </Box>
  );
}
