export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
        const res = await fetch('http://localhost:3000/alumnos/file', {
            method: 'POST',
            body: formData
        });
        
        if (!res.ok) {
            return [new Error(`Error uploading file: ${await res.statusText}`)];
        }

        const json = await res.json();
        console.log(json);
        return { error: null, data: json };
    } catch (error) {
        if (error instanceof Error) return [error];
    }

    return [new Error('Unknown Error')];
};
