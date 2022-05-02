import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const colorModeMatchesPreference = (colorMode: 'light' | 'dark'): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  colorMode === 'dark';

const ThemeToggle: React.FC = () => {
  const [didMount, setDidMount] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const Icon = useColorModeValue(MoonIcon, SunIcon);

  useEffect(() => {
    if (!didMount) {
      if (!colorModeMatchesPreference(colorMode)) {
        toggleColorMode();
      }
      setDidMount(true);
    }
  }, [didMount, colorMode, toggleColorMode]);

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      icon={<Icon width={'1.5em'} height={'1.5em'} />}
    />
  );
};

export default ThemeToggle;
