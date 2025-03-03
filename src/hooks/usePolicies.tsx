import useGetHook from "./useGetHook";

export const useUserPoliciesStats = () => {
  const url = `/admin/stats`;

  return useGetHook(url);
};

export const useUsers = () => {
  const url = `/admin/users`;

  return useGetHook(url);
};

export const useUserById = (id: string) => {
  const url = id ? `/admin/users/${id}` : null;

  return useGetHook(url);
};

export const usePolicies = () => {
  const url = `/admin/policies`;

  return useGetHook(url);
};

export const usePolicyById = (id: string) => {
  const url = `/admin/policies/${id}`;

  return useGetHook(url);
};

export const useAgents = () => {
  const url = `/admin/agents`;

  return useGetHook(url);
};

export const useClaims = () => {
  const url = `/admin/claims`;

  return useGetHook(url);
};

export const useClaimById = (id: string) => {
  const url = id ? `/admin/claims/${id}` : null;

  return useGetHook(url);
};

export const usePoliciesStats = () => {
  const url = `/admin/policies/policy/stats`;

  return useGetHook(url);
};

export const useClaimsStats = () => {
  const url = `/admin/claims/claim/stats`;

  return useGetHook(url);
};

export const useUserStats = () => {
  const url = `/admin/users/user/stats`;

  return useGetHook(url);
};
