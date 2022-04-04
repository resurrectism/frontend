import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { UserSignUpAttributes } from '../../api/types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { Api, UnprocessableEntityError } from '../../api/index';

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserSignUpAttributes>();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [shouldRenderAlert, setShouldRenderAlert] = useState(false);

  async function onSubmit(attributes: UserSignUpAttributes) {
    let errors = {};
    let shouldRenderAlert = false;

    try {
      await Api.usersCreate({
        data: {
          type: 'user',
          attributes,
        },
      });
      shouldRenderAlert = true;
    } catch (e) {
      if (e instanceof UnprocessableEntityError) {
        errors = e.errorsMap;
      }
    }

    setShouldRenderAlert(shouldRenderAlert);
    setErrors(errors);
  }

  const hasErrors = (field: string) =>
    errors[field] && errors[field].length > 0;

  const renderErrorMessages = (field: string) =>
    errors[field] &&
    errors[field].map((error) => (
      <FormErrorMessage key={error}>{error}</FormErrorMessage>
    ));

  return (
    <Flex
      direction={'column'}
      justifyContent="center"
      width={'100%'}
      maxWidth={'400px'}
      mt={12}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {shouldRenderAlert && (
          <Alert status="success" mb={'1em'}>
            <AlertIcon />
            <AlertTitle mr={2}>User Created Successfully!</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setShouldRenderAlert(false)}
            />
          </Alert>
        )}

        <FormControl isInvalid={hasErrors('email')} mb={'1em'}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {renderErrorMessages('email')}
        </FormControl>

        <FormControl isInvalid={hasErrors('password')} mb={'1em'}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
            />
            <InputRightElement>
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {renderErrorMessages('password')}
        </FormControl>

        <FormControl isInvalid={hasErrors('password_confirmation')} mb={'1em'}>
          <FormLabel htmlFor="password_confirmation">
            Confirm Password
          </FormLabel>
          <InputGroup>
            <Input
              id="password_confirmation"
              type={showPassword ? 'text' : 'password'}
              {...register('password_confirmation', { required: true })}
            />
            <InputRightElement>
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {renderErrorMessages('password_confirmation')}
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} isFullWidth>
          Sign Up
        </Button>
      </form>
    </Flex>
  );
};
