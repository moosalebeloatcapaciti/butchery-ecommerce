import DigitalOrderForm from "@/components/DigitalOrderForm";
import { AIRTIME_PROVIDERS } from "@/lib/storefront";

export default function AirtimePage() {
  return (
    <DigitalOrderForm
      category="airtime"
      title="Airtime"
      description="Choose a mobile network first, then select one of the available airtime amounts."
      options={AIRTIME_PROVIDERS}
    />
  );
}
