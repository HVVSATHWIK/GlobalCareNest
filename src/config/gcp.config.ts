export const gcpConfig = {
  projectId: import.meta.env.VITE_GCP_PROJECT_ID,
  credentials: {
    private_key_id: import.meta.env.VITE_GCP_PRIVATE_KEY_ID,
    client_email: import.meta.env.VITE_GCP_CLIENT_EMAIL,
    client_id: import.meta.env.VITE_GCP_CLIENT_ID,
  },
  region: import.meta.env.VITE_GCP_REGION
};