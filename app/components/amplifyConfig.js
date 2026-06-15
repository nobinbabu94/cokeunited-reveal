import { Amplify } from "aws-amplify";

// Replace these values with your Amplify project configuration
const awsConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_9iurl9wCh",
    userPoolWebClientId: "1raft5p1p09qt2b0nkftgq9qel",
    mandatorySignIn: false,
  },
};

export function initAmplify() {
  const cfg = awsConfig?.Auth || {};
  const placeholders = [
    "YOUR_AWS_REGION",
    "YOUR_USER_POOL_ID",
    "YOUR_APP_CLIENT_ID",
  ];

  const hasPlaceholders = placeholders.some((p) =>
    Object.values(cfg).some((v) => typeof v === "string" && v.includes(p))
  );

  if (hasPlaceholders) {
    console.warn(
      "Amplify not configured — please set real values in app/components/amplifyConfig.js"
    );
    return false;
  }

  Amplify.configure(awsConfig);
  return true;
}

export default awsConfig;
