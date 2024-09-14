export type TIdParam = { id: string };
export type TDestinationAccountQuery =
  | { pix_keys: string }
  | { id: string }
  | { accountNumber: string };
