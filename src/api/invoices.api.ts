import http from './http';

export class InvoicesApi {
  static async search(filter: any = {}) {
    return http.get('/invoices', filter);
  }

  static async find(id: string) {
    return http.get(`/invoices/${id}`);
  }

  static async create(data: any) {
    return http.post('/invoices', data);
  }

  static async saveDraft(data: any) {
    return http.post('/invoices/draft', data);
  }

  static async update(id: string, data: any) {
    return http.put(`/invoices/${id}`, data);
  }

  static async delete(id: string) {
    return http.delete(`/invoices/${id}`);
  }

  static async markAsPaid(id: string) {
    return http.patch(`/invoices/${id}/paid`);
  }
}