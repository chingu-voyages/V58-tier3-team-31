import * as Notifications from "expo-notifications";

export const checkAndRequestPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus === "granted") {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowList: true,
        shouldShowBanner: true,
      }),
    });
  }

  return finalStatus === "granted";
};

export const sendEnterAlert = async (regionIdentifier: string) => {
  const title = "🚨 Safety Alert: Alcohol Risk Zone Entered";
  const body = `You have entered the ${regionIdentifier} unsafe zone.`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
      data: {
        alertType: "GEOFENCE_ENTER",
        region: regionIdentifier,
      },
    },
    trigger: {
      seconds: 1,
      channelId: "geofence-alerts",
    },
  });

  console.log(
    `[Notification Scheduler] Alert for ${regionIdentifier} scheduled.`,
  );
};

export const sendExitAlert = async (regionIdentifier: string) => {
  const title = "✅ Risky Zone Exited";
  const body = `You have left the ${regionIdentifier} unsafe zone.`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
      data: {
        alertType: "GEOFENCE_EXIT",
        region: regionIdentifier,
      },
    },
    trigger: {
      seconds: 1,
      channelId: "geofence-alerts",
    },
  });

  console.log(
    `[Notification Scheduler] Alert for ${regionIdentifier} scheduled.`,
  );
};
