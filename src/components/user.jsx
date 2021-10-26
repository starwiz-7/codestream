import { useState } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaPalette } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { COLORS } from '../colors';
function User({ info, isMe = false, darkMode, onChangeName, onConfirm }) {
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState(info.name);
  const clickHandler = () => {
    onClose();
    if (edit.length > 0) onConfirm(edit);
  };
  const nameColor = 'green';
  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
    >
      <PopoverTrigger>
        <HStack
          p={2}
          rounded="md"
          _hover={{
            bgColor: useColorModeValue(COLORS.roomWhite, COLORS.roomDark),
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
        bgColor={useColorModeValue(COLORS.white, COLORS.roomDark)}
        borderColor={useColorModeValue('gray.200', '#464647')}
      >
        <PopoverHeader
          fontWeight="semibold"
          borderColor={useColorModeValue('gray.200', '#464647')}
        >
          Update Info
        </PopoverHeader>
        <PopoverArrow
          bgColor={useColorModeValue(COLORS.white, COLORS.roomDark)}
        />
        <PopoverCloseButton />
        <PopoverBody borderColor={useColorModeValue('gray.200', '#464647')}>
          <Input
            ref={inputRef}
            mb={2}
            value={edit}
            maxLength={25}
            onChange={event =>
              event.target.value.length >= 0 && setEdit(event.target.value)
            }
          />
          {/* <Button
            size="sm"
            w="100%"
            leftIcon={<FaPalette />}
            colorScheme={useColorModeValue'whiteAlpha' : 'gray'}
            // onClick={onChangeColor}
          >
            Change Color
          </Button> */}
        </PopoverBody>
        <PopoverFooter
          d="flex"
          justifyContent="flex-end"
          borderColor={useColorModeValue('gray.200', '#464647')}
        >
          <ButtonGroup size="sm">
            <Button colorScheme="blue" onClick={clickHandler}>
              Done
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default User;
