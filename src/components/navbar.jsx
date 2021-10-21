import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useClipboard,
  Button,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import LogoBlack from '../assets/logo.svg';
import LogoWhite from '../assets/logoWhite.svg';
export default function WithSubnavigation({ screen, slug }) {
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 2 }}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ md: 'start' }}>
          <img
            src={useColorModeValue(LogoBlack, LogoWhite)}
            height="50"
            width="200"
            alt="logo"
          ></img>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {screen !== undefined ? (
            <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Share'}</Button>
          ) : (
            <></>
          )}
          <ColorModeSwitcher />
        </Stack>
      </Flex>
    </Box>
  );
}
