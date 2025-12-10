import { supabase } from "./supabase";

export const enableForegroundPermission = async (userId: string) => {
  const { data, error } = await supabase
    .from("recoverers")
    .update({ foreground_location_permission: true })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const disableForegroundPermission = async (recovererId: string) => {
  const { data, error } = await supabase
    .from("recoverers")
    .update({ foreground_location_permission: false })
    .eq("id", recovererId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
