import { Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useProfile } from '../../hooks/user/useProfile';

const ProfilePage: React.FC = () => {
  const [profile] = useProfile();

  return (
    <Container width={['auto', '100%']} py={5} minHeight="300px">
      <Heading>Profile</Heading>
      <Divider />
      <Flex mt={5}>
        <Text fontWeight="bold" mr={2}>
          Email:
        </Text>
        <Text>{profile.email}</Text>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
