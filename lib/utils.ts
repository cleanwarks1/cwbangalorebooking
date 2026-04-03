export function generateBookingId() {
  const prefix = "CWB";
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
}