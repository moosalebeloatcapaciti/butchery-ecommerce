export const BUSINESS = {
  name: "The Butchery",
  tagline: "Proud. Bold. Fresh off the fire.",
  address: "2 Overdale Road W, Ravensmead, Cape Town, 7493",
  whatsappNumbers: ["0733137963", "0843861098"],
  // Primary WhatsApp number used for the "Send Order" checkout button.
  primaryWhatsapp: "27733137963",
  mapCoordinates: {
    lat: -33.923156,
    lng: 18.597211,
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=-33.923156,18.597211&z=17&output=embed",
  mapLinkUrl: "https://www.google.com/maps?q=-33.923156,18.597211",
};

export function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}
