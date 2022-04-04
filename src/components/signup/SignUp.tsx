import { useState, useEffect } from 'react';
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
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { Api, UnprocessableEntityError } from '../../api/index';

type SignUpProps = Record<string, unknown>;

export const SignUp = (props: SignUpProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [shouldRenderAlert, setShouldRenderAlert] = useState(false);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSubmitting(true);

    let errors = {};
    try {
      await Api.usersCreate({
        data: {
          type: 'user',
          attributes: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
      });
      setShouldRenderAlert(true);
      console.log('there', shouldRenderAlert);
    } catch (e) {
      if (e instanceof UnprocessableEntityError) {
        errors = e.errorsMap;
      }
      setShouldRenderAlert(false);
      console.log('here', e, shouldRenderAlert);
    }

    setErrors(errors);
    setSubmitting(false);
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
      w={['90%', '60%', '40%']}
    >
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
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        {renderErrorMessages('email')}
      </FormControl>

      <FormControl isInvalid={hasErrors('password')} mb={'1em'}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
        <FormLabel htmlFor="password_confirmation">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            id="password_confirmation"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
          />
          <InputRightElement>
            <Button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {renderErrorMessages('password_confirmation')}
      </FormControl>
      <Button type="submit" onClick={handleSubmit} isLoading={submitting}>
        Sign Up
      </Button>
    </Flex>
  );
};
