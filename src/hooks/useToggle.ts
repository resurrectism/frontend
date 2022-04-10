import { useState } from 'react';

export default function useToggle(
  initialValue = false,
): [boolean, (force?: boolean) => void] {
  const [isToggled, setToggled] = useState(initialValue);

  const toggle = (force?: boolean) =>
    setToggled(force === undefined ? !isToggled : force);

  return [isToggled, toggle];
}
