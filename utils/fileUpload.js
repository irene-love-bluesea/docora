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
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  console.log("File uploaded:", data);
  return data;
}

export async function getFileURL(
  filePath,
  bucketName = SUPABASE_FILE_BUCKET_NAME
) {
  try {
    if (!filePath || typeof filePath !== 'string' || filePath.trim() === '') {
      console.error("Invalid file path provided to getFileURL");
      return null;
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath.trim());

    if (data?.publicUrl && typeof data.publicUrl === 'string') {
      const cleanUrl = data.publicUrl.trim();
      // Validate URL format
      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        return cleanUrl;
      }
    }

    console.error("Invalid URL returned from Supabase:", data?.publicUrl);
    return null;
  } catch (error) {
    console.error("Get file URL error:", error);
    return null;
  }
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
