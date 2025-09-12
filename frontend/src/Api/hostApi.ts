// export const hostRequest = async (
//   userData: {
//     location: string;
//     amenities: string[];
//     documents: string[];
//     photos: string[];
    
//   },
//   dispatch: any
// ) => {
//   try {
//     dispatch(setLoading());
//     const response = await api.post("/register", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     dispatch(setError("Error registering user."));
//     throw error;
//   }
// };