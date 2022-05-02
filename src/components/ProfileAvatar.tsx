import { Avatar } from '@chakra-ui/react';
import { useProfile } from '../hooks/user/useProfile';

const ProfileAvatar: React.FC = () => {
  const [profile] = useProfile();
  return <Avatar name={profile.email} size="sm" />;
};

export default ProfileAvatar;
