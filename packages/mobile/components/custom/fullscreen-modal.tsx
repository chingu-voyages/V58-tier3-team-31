import { Modal, View, Text, StyleSheet } from "react-native";
import { Button } from "./button";
import { CloseIcon, Icon } from "./icon";

interface FullscreenModalProps {
	title: string;
	description?: string;
	actions: React.ReactNode;
	visible: boolean;
	onClose: () => void;
}

export const FullscreenModal = ({
	title,
	description,
	actions,
	visible,
	onClose,
}: FullscreenModalProps) => {
	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="fullScreen"
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<Button
						action="primary"
						onPress={onClose}
						size="lg"
						className="rounded-full p-3.5"
					>
						<Icon as={CloseIcon} />
					</Button>
				</View>

				<View style={styles.content}>
					{description && <Text style={styles.description}>{description}</Text>}
				</View>
				<View style={styles.actions}>{actions}</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		padding: 16,
		paddingBottom: 0,
	},
	closeButton: {},
	closeText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	content: {
		flex: 1,
		padding: 16,
		paddingTop: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: "#666666",
	},
	actions: {
		padding: 16,
	},
});
