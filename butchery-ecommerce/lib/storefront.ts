export type StoreOption = {
  id: string;
  name: string;
  image: string;
};

export const AIRTIME_PROVIDERS: StoreOption[] = [
  { id: "cellc", name: "Cell C", image: "/images/airtime/cellc_airtime.jpg" },
  { id: "mtn", name: "MTN", image: "/images/airtime/mtn_airtime.jpg" },
  { id: "rain", name: "Rain", image: "/images/airtime/rain_airtime.jpg" },
  { id: "telkom", name: "Telkom", image: "/images/airtime/telkom_airtime.jpg" },
  { id: "vodacom", name: "Vodacom", image: "/images/airtime/vodacom_airtime.jpg" },
];

export const VOUCHERS: StoreOption[] = [
  { id: "4u", name: "4U Voucher", image: "/images/voucher/4u_voucher.jpg" },
  {
    id: "easyvoucher",
    name: "EasyVoucher",
    image: "/images/voucher/easyvoucher_voucher.jpg",
  },
  { id: "ott", name: "OTT Voucher", image: "/images/voucher/ott_voucher.jpg" },
];

export const SERVICES: StoreOption[] = [
  {
    id: "electricity",
    name: "Electricity",
    image: "/images/services/electricity_service.jpg",
  },
  { id: "water", name: "Water", image: "/images/services/water_service.jpg" },
];

export type DigitalAmount = {
  value: number;
  fee: number;
  total: number;
};

const DIGITAL_DENOMINATIONS = [5, 10, 11, 12, 20];

export function getDigitalAmounts(maximum = 500): DigitalAmount[] {
  const denominations = [
    ...DIGITAL_DENOMINATIONS,
    ...Array.from(
      { length: Math.max(0, Math.floor((maximum - 20) / 5)) },
      (_, index) => 25 + index * 5
    ),
  ];

  return denominations
    .filter((value) => value <= maximum)
    .map((value) => {
      const fee = value === 5 || value >= 25 ? 1 : 0;
      return { value, fee, total: value + fee };
    });
}
