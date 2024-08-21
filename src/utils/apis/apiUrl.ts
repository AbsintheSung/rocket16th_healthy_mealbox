const baseURL = import.meta.env.VITE_APP_API_URL
const urlName = import.meta.env.VITE_APP_API_NAME

// export const registerApi = `${baseURL}/${urlName}/auth/register`
// export const signinApi = `${baseURL}/${urlName}/auth/login`

export const registerApi = `/${urlName}/auth/register`
export const signinApi = `/${urlName}/auth/login`
