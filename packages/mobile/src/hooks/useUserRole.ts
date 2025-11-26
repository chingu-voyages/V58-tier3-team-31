import useSession from "./useSession";
import { useState, useEffect } from "react";
import type { UserRole } from "@/types/users";
import { fetchUserRole } from "@/lib/auth";

const useUserRole = () => {
	const { session } = useSession();
	const [userRole, setUserRole] = useState<UserRole | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!session?.user) {
			setUserRole(null);
			setIsLoading(false);
			return;
		}

		const loadRole = async () => {
			setIsLoading(true);

			try {
				const roleData = await fetchUserRole(session.user.id);
				setUserRole(roleData);
			} catch (err) {
				console.error("Failed to fetch user role:", err);
			} finally {
				setIsLoading(false);
			}
		};

		loadRole();
	}, [session]);

	return { userRole, isLoading };
};

export default useUserRole;
