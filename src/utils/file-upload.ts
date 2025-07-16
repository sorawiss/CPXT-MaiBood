import supabase from "@/lib/supabase";

export async function uploadFileToSupabase(file: File, bucket: string) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${bucket}/${fileName}`;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return data.publicUrl;
} 