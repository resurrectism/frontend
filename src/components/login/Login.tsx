import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { Api } from '../../api/index';

type LoginProps = Record<string, unknown>;

export const Login = (props: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const json = await Api.usersLogin({
        data: {
          type: 'user',
          attributes: {
            email,
            password,
          },
        },
      });
      console.log(json);
    } catch (e) {
      console.log('error', e);
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 2000);

    console.log('submit', email, password, props);
  }

  return (
    <Flex direction="column" justifyContent="center" w={['90%', '60%', '40%']}>
      <FormControl>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <FormHelperText>Helper</FormHelperText>
      </FormControl>

      <FormControl>
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
        <FormHelperText>Helper</FormHelperText>
        <Button type="submit" onClick={handleSubmit} isLoading={submitting}>
          Login
        </Button>
      </FormControl>
    </Flex>
  );
};
