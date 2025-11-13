import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import type { Session, User } from "@supabase/supabase-js";

const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error) Alert.alert(error.message);
			setSession(session);
			setLoading(false);
		});
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
				setLoading(false);
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
