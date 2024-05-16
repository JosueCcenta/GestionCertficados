export const getPagination = async (file) => {
    try {
        const res = fetch('http://localhost:3000/alumnos/listado/:page',{
            method : 'GET',
        })
        if(!res.ok) return[new Error(`Error uploading file: ${(await res).statusText}`)]
        const json = await res.json();
        return { error: null, data: json.data };
        
    } catch (error) {
        if (error instanceof Error) return [error]
    }

    return[new Error('Unknown Error')]
};
  