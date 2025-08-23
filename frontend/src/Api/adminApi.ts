import adminApi from "../axios/adminInstances"


type AdminLoginCredentials = {
  email: string;
  password: string;
};

type AdminLoginResponse = {
  success: boolean;
  message: string;
  admin?: {
    _id: string;
    email: string;
    // Add other admin fields as needed
  };
  accessToken?: string;
  error?: string;
};



export const adminLoginService = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  try {
    const response = await adminApi.post("/login", credentials);

    if (!response.data?.data) {
      throw new Error("Invalid response structure");
    }

    const { admin, accessToken } = response.data.data;

    return {
      success: true,
      message: "Login successful",
      admin: {
        _id: admin._id,
        email: admin.email,
        // Add other admin fields as needed
      },
      accessToken
    };
  } catch (error) {
    const axiosError = error as IAxiosError;
    let errorMessage = "Invalid email or password. Please try again.";

    if (axiosError.response) {
      // Handle specific HTTP status codes
      switch (axiosError.response.status) {
        case 401:
          errorMessage = "Invalid credentials";
          break;
        case 403:
          errorMessage = "Account not authorized for admin access";
          break;
        case 404:
          errorMessage = "Admin account not found";
          break;
        default:
          errorMessage = axiosError.response.data?.message || errorMessage;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Admin login error:", error);
    return {
      success: false,
      message: errorMessage,
      error: errorMessage
    };
  }
};

export const fetchUser = async (
  page: number,
  limit: number,
  searchTerm: string,
  isBlocked: string
) => {
  try {
    const response = await adminApi.get<any>("/users", {
      params: { page, limit, searchTerm, isBlocked },
    });

    // Extract the nested `data` object from the response
    const { data } = response.data;

    console.log("Extracted data:", data); // Log the extracted data
    return data; // Return the nested `data` object
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw new Error("Failed to fetch Users. Please try again later.");
  }
};

export const blockUser = async (userId : string , isBlocked : boolean) => {
    try {
       await adminApi.post('/block-user', { userId, isBlocked });
        
    }catch (error: any) {
        console.error('Error blocking user:', error.response?.data || error.message);
      }
}