import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";

const useAuth = () => {
	const [loading, setLoading] = useState(false);

	const signInWithEmail = async (
		email: string,
		password: string,
	): Promise<void> => {
		setLoading(true);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				Alert.alert(error.message);
			}
		} catch (err) {
			Alert.alert("An unexpected error occurred during sign-in.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const signUpWithEmail = async (
		email: string,
		password: string,
	): Promise<void> => {
		setLoading(true);

		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.signUp({ email, password });

			if (error) {
				Alert.alert(error.message);
			} else if (!session) {
				Alert.alert("Please check your inbox for email verification");
			}
		} catch (err) {
			Alert.alert("An unexpected error occurred during sign-up.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signInWithEmail, signUpWithEmail };
};

export default useAuth;
