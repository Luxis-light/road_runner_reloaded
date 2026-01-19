

export async function login(username: string, userPassword: string): Promise<any> {
    const response = await fetch("http://141.45.191.149:7777/bikelin/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            
            UserCreds: {
                username: username,
                password: userPassword
            }
         }),
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error("Ungültiger Benutzername oder Passwort");
    }
    
    if (!response.ok) {
        throw new Error("Login fehlgeschlagen");
    }

 
    const data = await response.json();
    return data;
}
