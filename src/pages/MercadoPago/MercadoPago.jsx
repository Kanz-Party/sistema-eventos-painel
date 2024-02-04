import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-d4c240b1-40e8-44f6-8251-bdc0b5e9c022");

export default function MercadoPago() {
  return (
    <Wallet
      initialization={{ preferenceId: "1661485047-c7b23fca-0cf9-4c5e-a8a8-9a795254be6b" }}
      onResult={(result) => console.log(result)}
    />
  );
}
