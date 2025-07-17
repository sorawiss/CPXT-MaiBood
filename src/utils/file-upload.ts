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

export async function deleteFileFromSupabase(fileUrl: string, bucketName: string): Promise<boolean> {
    if (!fileUrl) return false;

    try {
        const url = new URL(fileUrl);
        const filePath = url.pathname.split(`/${bucketName}/`)[1];
        
        if (!filePath) {
            console.error("Could not extract file path from URL:", fileUrl);
            return false;
        }

        const { error } = await supabase.storage
            .from(bucketName)
            .remove([filePath]);

        if (error) {
            console.error("Error deleting file:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error processing file deletion:", error);
        return false;
    }
} 