import { SUPABASE_FILE_BUCKET_NAME } from "@env";
import { supabase } from "./supabaseClient";

export async function uploadFile(
  userID,
  file,
  bucketName = SUPABASE_FILE_BUCKET_NAME
) {
  const filePath = `${userID}/${Date.now()}_${file.name}`; // e.g., user_123/17123456789_file.pdf

  const response = await fetch(file.uri);
  const fileBody = await response.arrayBuffer();

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, fileBody, {
      contentType: file.mimeType || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  console.log("File uploaded:", data);
  return data;
}

export async function getFileURL(
  userID,
  fileName,
  bucketName = SUPABASE_FILE_BUCKET_NAME
) {
  const filePath = `${userID}/${fileName}`;

  const { data } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteFile(filePath, bucketName = SUPABASE_FILE_BUCKET_NAME) {
  console.log("Deleting file at path:", filePath , bucketName);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    console.error("Delete error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
