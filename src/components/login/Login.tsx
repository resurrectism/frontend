import { useState } from 'react';
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
import { UserLoginAttributes } from '../../api/types';
import { useForm } from 'react-hook-form';

import { Api, ApiError } from '../../api/index';
import { InputFormControl } from '../form/InputFormControl';
import { PasswordFormControl } from '../form/PasswordFormControl';

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserLoginAttributes>();

  const [shouldRenderAlert, setShouldRenderAlert] = useState(false);

  async function onSubmit(attributes: UserLoginAttributes) {
    try {
      await Api.usersLogin({
        data: {
          type: 'user',
          attributes,
        },
      });
    } catch (e) {
      if (e instanceof ApiError) {
        setShouldRenderAlert(true);
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
        {shouldRenderAlert && (
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
              onClick={() => setShouldRenderAlert(false)}
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
