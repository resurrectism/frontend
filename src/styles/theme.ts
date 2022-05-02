import {
  extendTheme,
  ThemeComponentProps,
  withDefaultColorScheme,
} from '@chakra-ui/react';

export const theme = extendTheme(
  {
    components: {
      Container: {
        baseStyle: (props: ThemeComponentProps) => ({
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          borderRadius: 'md',
        }),
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'purple' }),
);
