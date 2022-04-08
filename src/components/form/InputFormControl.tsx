import {
  FormControl,
  FormLabel,
  Input,
  FormControlProps,
  InputProps,
} from '@chakra-ui/react';

export type InputFormControlProps = FormControlProps & {
  fieldName: string;
  label: string;
  InputProps?: InputProps;
};

export const InputFormControl: React.FC<InputFormControlProps> = ({
  fieldName,
  label,
  InputProps,
  children,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input id={fieldName} {...InputProps} />
      {children}
    </FormControl>
  );
};
