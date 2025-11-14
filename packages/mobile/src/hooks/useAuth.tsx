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

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			Alert.alert(error.message);
		}
		setLoading(false);
	};

	const signUpWithEmail = async (
		email: string,
		password: string,
	): Promise<void> => {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({ email, password });

		if (error) {
			Alert.alert(error.message);
		} else if (!session) {
			Alert.alert("Please check your inbox for email verification");
		}

		setLoading(false);
	};

	return { loading, signInWithEmail, signUpWithEmail };
};

export default useAuth;
