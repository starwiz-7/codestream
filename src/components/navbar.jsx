import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useClipboard,
  Button,
  Center,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { COLORS } from '../colors';
import LogoBlack from '../assets/logo.svg';
import LogoWhite from '../assets/logoWhite.svg';
import { MdOutlineNoteAdd } from 'react-icons/md';

export default function WithSubnavigation({ screen, onQuestionOpen }) {
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  return (
    <Box>
      <Flex
        bg={useColorModeValue(
          screen !== undefined ? COLORS.roomWhite : COLORS.white,
          COLORS.dark
        )}
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
            width="150"
            alt="logo"
          ></img>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}
        >
          {screen !== undefined ? (
            <>
              <Tooltip label="Add a new Question">
                <IconButton
                  aria-label="Add Question Pane"
                  onClick={onQuestionOpen}
                  icon={<MdOutlineNoteAdd />}
                />
              </Tooltip>
              <Button onClick={onCopy}>
                {hasCopied ? 'Copied!' : 'Share'}
              </Button>
            </>
          ) : (
            <></>
          )}
          <ColorModeSwitcher />
          {screen !== undefined ? (
            <Center w="40px" display={{ base: 'block', md: 'none' }}></Center>
          ) : (
            <></>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
