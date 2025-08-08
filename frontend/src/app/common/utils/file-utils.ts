export class FileUtils {
    public static toBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    }

    public static async urlToFile(url: string, filename: string) {
        try {
            // 1. Obtener la imagen como blob
            const response = await fetch(url);
            const blob = await response.blob();

            // 2. Convertir el blob a File object
            return new File([blob], filename);
        } catch (error) {
            console.error('Error al convertir URL a File:', error);
            return null;
        }
    }
}