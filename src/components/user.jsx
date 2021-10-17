import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaPalette } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

function User({ info, isMe = false, darkMode, onChangeName }) {
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nameColor = 'green';
  return (
    <Popover
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
    >
      <PopoverTrigger>
        <HStack
          p={2}
          rounded="md"
          _hover={{
            bgColor: darkMode ? '#464647' : 'gray.200',
            cursor: 'pointer',
          }}
          onClick={() => isMe && onOpen()}
        >
          <Icon as={VscAccount} />
          <Text fontWeight="medium" color={nameColor}>
            {info.name}
          </Text>
          {isMe && <Text>(you)</Text>}
        </HStack>
      </PopoverTrigger>
      <PopoverContent
        bgColor={darkMode ? '#333333' : 'white'}
        borderColor={darkMode ? '#464647' : 'gray.200'}
      >
        <PopoverHeader
          fontWeight="semibold"
          borderColor={darkMode ? '#464647' : 'gray.200'}
        >
          Update Info
        </PopoverHeader>
        <PopoverArrow bgColor={darkMode ? '#333333' : 'white'} />
        <PopoverCloseButton />
        <PopoverBody borderColor={darkMode ? '#464647' : 'gray.200'}>
          <Input
            ref={inputRef}
            mb={2}
            value={info.name}
            maxLength={25}
            onChange={event => onChangeName?.(event.target.value)}
          />
          <Button
            size="sm"
            w="100%"
            leftIcon={<FaPalette />}
            colorScheme={darkMode ? 'whiteAlpha' : 'gray'}
            //   onClick={onChangeColor}
          >
            Change Color
          </Button>
        </PopoverBody>
        <PopoverFooter
          d="flex"
          justifyContent="flex-end"
          borderColor={darkMode ? '#464647' : 'gray.200'}
        >
          <ButtonGroup size="sm">
            <Button colorScheme="blue" onClick={onClose}>
              Done
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default User;
