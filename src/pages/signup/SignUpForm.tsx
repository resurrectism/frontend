import { useState } from 'react';
import {
  FormErrorMessage,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { UserSignUpAttributes } from '../../api/types';
import { useForm } from 'react-hook-form';

import { Api, UnprocessableEntityError } from '../../api/index';
import { InputFormControl } from '../../components/form/InputFormControl';
import { PasswordFormControl } from '../../components/form/PasswordFormControl';
import useToggle from '../../hooks/useToggle';

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserSignUpAttributes>();

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSuccessful, toggleIsSuccessful] = useToggle();

  async function onSubmit(attributes: UserSignUpAttributes) {
    let errors = {};
    let isSuccessful = false;

    try {
      await Api.usersCreate({
        data: {
          type: 'user',
          attributes,
        },
      });
      isSuccessful = true;
    } catch (e) {
      if (e instanceof UnprocessableEntityError) {
        errors = e.errorsMap;
      }
    }

    toggleIsSuccessful(isSuccessful);
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
      maxWidth={'400px'}
      width={'100%'}
      p={12}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccessful && (
          <Alert status="success" mb={'1em'}>
            <AlertIcon />
            <AlertTitle mr={2}>User Created Successfully!</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => toggleIsSuccessful(false)}
            />
          </Alert>
        )}

        <InputFormControl
          fieldName="email"
          label="Email Address"
          isInvalid={hasErrors('email')}
          mb={'1em'}
          InputProps={{ ...register('email', { required: true }) }}
        >
          {renderErrorMessages('email')}
        </InputFormControl>

        <PasswordFormControl
          fieldName="password"
          label="Password"
          isInvalid={hasErrors('password')}
          mb={'1em'}
          InputProps={{ ...register('password', { required: true }) }}
        >
          {renderErrorMessages('password')}
        </PasswordFormControl>

        <PasswordFormControl
          fieldName="password_confirmation"
          label="Password Confirmation"
          isInvalid={hasErrors('password_confirmation')}
          mb={'1em'}
          InputProps={{
            ...register('password_confirmation', { required: true }),
          }}
        >
          {renderErrorMessages('password_confirmation')}
        </PasswordFormControl>

        <Button type="submit" isLoading={isSubmitting} isFullWidth>
          Sign Up
        </Button>
      </form>
    </Flex>
  );
};

export default SignUpForm;
