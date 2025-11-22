import useSession from "./useSession";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type { Sponsor } from "@/types/users";
import { Alert } from "react-native";

const fetchSponsor = async (userId: string) => {
	try {
		const { data, error } = await supabase
			.from("sponsors")
			.select("*")
			.eq("user_id", userId)
			.single();

		if (error) return Alert.alert(error.message);

		return data;
	} catch (err) {
		console.error("There was a problem fetching the sponsor:", err);
		if (err instanceof Error) return Alert.alert(err.message);
	}
};

const useSponsor = () => {
	const { session } = useSession();
	const [sponsor, setSponsor] = useState<Sponsor | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleFetchSponsor = async () => {
			if (!session?.user) return Alert.alert("No user found");
			setIsLoading(true);

			try {
				const sponsorData = await fetchSponsor(session?.user.id);

				if (sponsorData) setSponsor(sponsorData);
			} catch (err) {
				console.error("Failed to load sponsor:", err);
				if (err instanceof Error) return Alert.alert(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (session?.user) {
			handleFetchSponsor();
		}
	}, [session?.user]);

	return { sponsor, isLoading };
};

export default useSponsor;
