import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { UserLoginAttributes } from '../../api/types';
import { Api, UnauthorizedError } from '../../api/index';
import { InputFormControl } from '../../components/form/InputFormControl';
import { PasswordFormControl } from '../../components/form/PasswordFormControl';
import { useUpdateIsAuthenticated } from '../../hooks/user/useIsAuthenticated';
import useToggle from '../../hooks/useToggle';
import useRedirect from '../../hooks/useRedirect';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserLoginAttributes>();

  const setIsAuthenticated = useUpdateIsAuthenticated();
  const [hasError, toggleHasError] = useToggle();
  const redirectTo = useRedirect();

  async function onSubmit(attributes: UserLoginAttributes) {
    try {
      await Api.usersLogin({
        data: {
          type: 'user',
          attributes,
        },
      });
      setIsAuthenticated(true);
      redirectTo('/');
      toggleHasError(false);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        toggleHasError(true);
      } else {
        throw e;
      }
    }
  }

  return (
    <Flex
      direction={'column'}
      justifyContent="center"
      maxWidth={'400px'}
      width={'100%'}
      p={12}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {hasError && (
          <Alert status="error" mb={'1em'}>
            <AlertIcon />
            <Box flex="1">
              <AlertTitle mr={2}>Failed to login!</AlertTitle>
              <AlertDescription mr={2}>
                Check your email and password
              </AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => toggleHasError(false)}
            />
          </Alert>
        )}

        <InputFormControl
          fieldName="email"
          label="Email Address"
          mb={'1em'}
          InputProps={{ ...register('email', { required: true }) }}
        />

        <PasswordFormControl
          fieldName="password"
          label="Password"
          mb={'1em'}
          InputProps={{ ...register('password', { required: true }) }}
        />

        <Button type="submit" isLoading={isSubmitting} isFullWidth>
          Login
        </Button>
      </form>
    </Flex>
  );
};

export default LoginForm;
