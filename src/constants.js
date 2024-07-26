// SERVER DATA
export const VITE_CASHMATIC_PORT=50301;
export const VITE_CASHMATIC_SERVER_IP='192.168.1.171';
export const VITE_CASHMATIC_PROTOCOL='https';

//USER DATA
export const VITE_CASHMATIC_USERNAME='admin';
export const VITE_CASHMATIC_PASSWORD='Marelsrl2024.';

// OPERATIONS ENDPOINT
export const VITE_CASHMATIC_LOGIN_ENDPOINT='/api/user/Login';
export const VITE_CASHMATIC_RENEW_TOKEN_ENDPOINT='/api/user/RenewToken';
export const VITE_CASHMATIC_START_REFILL_ENDPOINT='/api/transaction/StartRefill';
export const VITE_CASHMATIC_STOP_REFILL_ENDPOINT='/api/transaction/StopRefill';
export const VITE_CASHMATIC_START_PAYMENTS_ENDPOINT='/api/transaction/StartPayment';
export const VITE_CASHMATIC_CANCEL_PAYMENTS_ENDPOINT='/api/transaction/CancelPayment';
export const VITE_CASHMATIC_COMMIT_PAYMENTS_ENDPOINT='/api/transaction/CommitPayment';
export const VITE_CASHMATIC_START_WITHDRAWAL_ENDPOINT='/api/transaction/StartWithdrawal';
export const VITE_CASHMATIC_EMPTY_CASHBOX='/api/transaction/StartEmptyCashboxNotes';

// DEVICE ENDPOINT
export const VITE_CASHMATIC_ALL_LEVELS_ENDPOINT='/api/device/AllLevels';
export const VITE_CASHMATIC_ACTIVE_TRANSACTION_ENDPOINT='/api/device/ActiveTransaction';
export const VITE_CASHMATIC_LAST_TRANSACTION_ENDPOINT='/api/device/LastTransaction';
export const VITE_CASHMATIC_DEVICE_INFO_ENDPOINT='/api/device/GetDeviceInfo';

// USER ENDPOINT
export const VITE_CASHMATIC_DETAILS_ENDPOINT='/api/user/Details';

// UTILITY ENDPOINT
export const VITE_CASHMATIC_POWER_OFF_ENDPOINT='/api/utility/Poweroff';
export const VITE_CASHMATIC_REBOOT_ENDPOINT='/api/utility/Reboot';
export const VITE_CASMATIC_REPORT_ENDPOINT='/api/report/GetTransactions';