import { useLocation } from 'wouter';

export default function useRedirect() {
  const [, navigate] = useLocation();

  return navigate;
}
