import { useQuery } from "@tanstack/react-query";

const fetchAccessToken = async (): Promise<string> => {
  const clientId = 'd697dde6b9cc4bf895a0de0f43212b36';
  const clientSecret = '6cf9ff14dde24b82b9e98e054855ae73';
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch('https://oauth.fatsecret.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials&scope=basic',
  });
  if (!response.ok) throw new Error(`Auth failed: ${response.status}`);
  const data = await response.json();
  return data.access_token;
};

export function useAccessToken() {
  return useQuery<string, Error>({
    queryKey: ["accessToken"],
    queryFn: fetchAccessToken,
    staleTime: 23 * 60 * 60 * 1000, // token valide 24h, on le renouvelle après 23h
    retry: 2,
  });
}
