import http from '../http-common';

class LotService {
    create(lot) {
        return http.post(`/lot`, lot);
    }

    getAll() {
        return http.get(`/lot`);
    }

    get(id) {
        return http.get(`/lot/${id}`);
    }

    getByCustomer(code) {
        return http.get(`/lot/byCustomer/${code}`);
    }

    update(id, lot) {
        return http.put(`/lot/${id}`, lot);
    }

    delete(id) {
        return http.delete(`/lot/${id}`);
    }
}

export default new LotService();
