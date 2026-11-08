import { createContext, useContext } from "react";

export const BookingContext = createContext<(preselect?: string) => void>(() => {});
export const useBooking = () => useContext(BookingContext);
