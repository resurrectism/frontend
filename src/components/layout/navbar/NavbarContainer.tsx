import { Flex, FlexProps, theme, useColorModeValue } from '@chakra-ui/react';

const NAVBAR_HEIGHT = '3.5rem';

const NavbarContainer: React.FC<FlexProps> = ({ children, ...props }) => {
  const bgColor = useColorModeValue('inherit', theme.colors.blackAlpha[100]);
  const shadow = useColorModeValue('sm', 'none');
  return (
    <Flex
      w="100vw"
      h={NAVBAR_HEIGHT}
      alignItems="center"
      justifyContent="space-between"
      px={4}
      backgroundColor={bgColor}
      shadow={shadow}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
