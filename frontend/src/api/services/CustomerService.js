import http from '../http-common';

class CustomerService {
    create(customer) {
        return http.post(`/customer`, customer);
    }

    getAll() {
        return http.get(`/customer`);
    }

    get(id) {
        return http.get(`/customer/${id}`);
    }

    update(id, customer) {
        return http.put(`/customer/${id}`, customer);
    }

    delete(id) {
        return http.delete(`/customer/${id}`);
    }
}

export default new CustomerService();
