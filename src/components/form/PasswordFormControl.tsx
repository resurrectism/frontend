import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { InputFormControlProps } from './InputFormControl';

export const PasswordFormControl: React.FC<InputFormControlProps> = ({
  fieldName,
  label,
  InputProps,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl {...props}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={fieldName}
          type={showPassword ? 'text' : 'password'}
          {...InputProps}
        />
        <InputRightElement>
          <Button
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {children}
    </FormControl>
  );
};
