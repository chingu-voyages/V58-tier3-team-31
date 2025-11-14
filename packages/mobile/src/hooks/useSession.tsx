import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import type { Session, User } from "@supabase/supabase-js";

const fetchSession = async (
	setSession: (s: Session | null) => void,
	setLoading: (l: boolean) => void,
) => {
	setLoading(true);

	try {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		if (error) {
			Alert.alert(error.message);
		}

		setSession(session);
	} catch (err) {
		Alert.alert("Error fetching session state.");
		console.error("Session fetch failed:", err);
	} finally {
		setLoading(false);
	}
};

const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchSession(setSession, setLoading);

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			},
		);

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	return {
		session,
		user: session?.user as User | undefined,
		loading,
	};
};

export default useSession;
