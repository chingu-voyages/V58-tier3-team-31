import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export const signInWithEmail = async (
	email: string,
	password: string,
): Promise<void> => {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);
};

export const signUpWithEmail = async (
	email: string,
	password: string,
): Promise<Session | null> => {
	const {
		data: { session },
		error,
	} = await supabase.auth.signUp({ email, password });

	if (error) throw new Error(error.message);

	return session;
};

export const signUpRecoverer = async (userId: string): Promise<void> => {
	const { data, error } = await supabase
		.from("recoverers")
		.insert([{ user_id: userId }]);

	if (error) throw new Error(error.message);

	if (data) return data;
};
