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

export async function deleteFileFromSupabase(fileUrl: string, bucket: string) {
    if (!fileUrl) return;

    try {
        const fileName = fileUrl.split('/').pop();
        if (!fileName) return;

        const { error } = await supabase.storage
            .from(bucket)
            .remove([fileName]);

        if (error) {
            console.error("Error deleting file:", error);
        }
    } catch (error) {
        console.error("Error parsing file URL:", error);
    }
} 