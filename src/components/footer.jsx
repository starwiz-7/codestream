import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import LogoBlack from '../assets/logo.svg';
import LogoWhite from '../assets/logoWhite.svg';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <chakra.footer
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={50}
      mb={-10}
    >
      <Container
        as={Stack}
        maxW={'10xl'}
        pt={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <img
          src={useColorModeValue(LogoBlack, LogoWhite)}
          height="50"
          width="200"
          alt="logo"
        ></img>
        <Text>Made with ❤ by Aryan Yadav</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'https://twitter.com/7Aryany'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={'LinkedIn'}
            href={'https://www.linkedin.com/in/yadav-aryan/'}
          >
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton
            label={'Instagram'}
            href={'https://www.instagram.com/aryann__7/'}
          >
            <FaInstagram />
          </SocialButton>
          <SocialButton
            label={'Github'}
            href={'https://github.com/starwiz-7/codestream'}
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </chakra.footer>
  );
}
