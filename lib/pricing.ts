export function calculatePrice(data: any) {
  let total = 0;

  // Sofa
  if (data.sofaSeats) {
    const sofaPrices: any = {
      1: 500,
      2: 900,
      3: 1200,
      4: 1600,
      5: 2000,
    };

    total += sofaPrices[data.sofaSeats] || (data.sofaSeats * 400);

    if (data.recliners) total += data.recliners * 700;
    if (data.diningChairs) total += data.diningChairs * 100;
  }

  // Mattress
  if (data.mattresses) {
    data.mattresses.forEach((m: string) => {
      if (m === "single") total += 600;
      if (m === "double") total += 900;
      if (m === "king") total += 1200;
    });
  }

  // Carpet
  if (data.carpetSqft) {
    let rate = 25;
    if (data.carpetSqft > 50) rate = 20;
    if (data.carpetSqft > 150) rate = 16;
    if (data.carpetSqft > 300) rate = 13;

    total += data.carpetSqft * rate;

    if (total < 500) total = 500;
  }

  // Car
  if (data.carType) {
    const carPrices: any = {
      hatchback: 1500,
      sedan: 1800,
      suv: 2400,
      luxury: 3000,
    };

    total += carPrices[data.carType] || 0;
  }

  // Minimum charge
  if (total < 2000) total = 2000;

  return total;
}