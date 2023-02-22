import moment, { Moment } from 'moment';

export const formatDate = (date?: string | Date | Moment | number, format?: string) => {
  if (!date) return '';
  return moment(date).local().format(format);
}