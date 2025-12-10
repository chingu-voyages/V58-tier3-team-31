import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="SignIn"
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="roleSelection"
        options={{
          title: "Select role",
        }}
      />
      <Stack.Screen
        name="locationConsent"
        options={{
          title: "Location Consent",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
