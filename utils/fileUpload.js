import {SUPABASE_BUCKET_NAME } from "@env";

export async function uploadFile(userID, file, bucketName = SUPABASE_BUCKET_NAME) {
  const filePath = `${userID}/${Date.now()}_${file.name}`; // e.g., user_123/17123456789_file.pdf

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  console.log("File uploaded:", data);
  return data;
}

export function getFileURL(userID, fileName, bucketName = SUPABASE_BUCKET_NAME) {
  const filePath = `${userID}/${fileName}`;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return data.publicUrl;
}

export function deleteFile(filePath, bucketName = SUPABASE_BUCKET_NAME) {
  supabase.storage.from(bucketName).remove([filePath]);
}