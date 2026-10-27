import DigitalOrderForm from "@/components/DigitalOrderForm";
import { VOUCHERS } from "@/lib/storefront";

export default function VoucherPage() {
  return (
    <DigitalOrderForm
      category="voucher"
      title="Vouchers"
      description="Choose a voucher type first, then select the amount you need."
      options={VOUCHERS}
    />
  );
}
