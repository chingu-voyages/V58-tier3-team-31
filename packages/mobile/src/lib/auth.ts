import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Recoverer, Sponsor } from "@/types/users";

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

export const signUpRecoverer = async (
	userId: string,
): Promise<Recoverer | undefined> => {
	const { data, error } = await supabase
		.from("recoverers")
		.insert([{ user_id: userId, first_name: "Default", last_name: "Default" }]);

	if (error) throw new Error(error.message);

	if (data) return data;
};

export const signUpSponsor = async (
	userId: string,
): Promise<Sponsor | undefined> => {
	const { data, error } = await supabase
		.from("sponsors")
		.insert([{ user_id: userId, first_name: "John", last_name: "Doe" }])
		.select()
		.single();

	console.log("sign up sponsor data:", data);

	if (error) throw new Error(error.message);
	if (data) return data;
};

export const fetchRecoverer = async (userId: string) => {
	const { data, error } = await supabase
		.from("recoverers")
		.select("*")
		.eq("user_id", userId)
		.single();

	if (error) throw new Error(error.message);
	return data;
};
