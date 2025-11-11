import "react-native-url-polyfill";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { View, Text } from "react-native";
import type { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";

export default function Signup() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<View>
			<Auth />
			{session?.user?.id && <Text>{session.user.id}</Text>}
		</View>
	);
}
