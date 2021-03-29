export function formatDateTime(date) {
    const d = new Date(date);
    const m = d.getMonth() + 1;
    const j = d.getDate();
    return (j < 10 ? '0' : '') + j + '/' +  (m < 10 ? '0': '') + m + '/' + d.getFullYear() + ' a ' + (d.getHours() < 10 ? '0' : '' )+ d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '' ) + d.getMinutes();
}