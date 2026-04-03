import { bookingSchema } from "./booking.schema";
import { createBooking } from "./booking.service";

export async function handleCreateBooking(body: any) {
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return {
      error: "Invalid input",
      details: parsed.error.flatten(),
    };
  }

  try {
    const booking = await createBooking(parsed.data);
    return { booking };
  } catch (err: any) {
    if (err.message === "SLOT_UNAVAILABLE") {
      return {
        error:
          "This time slot is no longer available. Please go back and select a different time.",
      };
    }
    // Re-throw unexpected errors — caught by the API route's try/catch
    throw err;
  }
}
