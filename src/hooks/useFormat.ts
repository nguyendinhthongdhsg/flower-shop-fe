export default function format(n: number, currency: string) {
    const nFormat = new Intl.NumberFormat();
    return nFormat.format(n) + ' ' + currency;
}
