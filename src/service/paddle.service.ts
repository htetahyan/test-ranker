const BASE_URL = process.env.PADDLE_API_URL;
export const GetRequest = async (path: string) => {
    console.log(BASE_URL + path);
   return await fetch(BASE_URL + path, {
        method: "GET",
        headers: {
           
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        },
    });
   
};
export const PostRequest = async (path: string, body: any) => {
    return await fetch(BASE_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        },
        body: JSON.stringify(body),
    });
}