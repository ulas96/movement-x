import { useEffect, useState, useCallback } from 'react';
import { aptos } from '../config/aptosClient';
import { FUNCTIONS } from '../constants/contract';

export function useUserRegistration(address: string | undefined) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const checkRegistration = useCallback(async () => {
    if (!address) {
      setIsRegistered(false);
      setUserName('');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Check if user is registered
      const [registered] = await aptos.view<[boolean]>({
        payload: {
          function: FUNCTIONS.IS_REGISTERED,
          functionArguments: [address],
        },
      });

      setIsRegistered(registered);

      // If registered, fetch username
      if (registered) {
        const [name] = await aptos.view<[string]>({
          payload: {
            function: FUNCTIONS.GET_USER_NAME,
            functionArguments: [address],
          },
        });
        setUserName(name);
      } else {
        setUserName('');
      }
    } catch (error) {
      console.error('Error checking registration:', error);
      setIsRegistered(false);
      setUserName('');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    checkRegistration();
  }, [checkRegistration]);

  return { isRegistered, userName, loading, refetch: checkRegistration };
}
