import axios from "axios"

const api = axios.create({ baseURL: `http://localhost:3000` });
const TicketService = {
     filterTickets: async (filters?: any) => {
          const resp = await api.get(`/ticket`, { params: filters });
          return resp.data;
     },
     createTicket: async (payload: any) => {
          const resp = await api.post(`/ticket`, payload);
          return resp.data;
     },
     updateTicket: async (id: string, payload: any) => {
          const resp = await api.patch(`/ticket/${id}`, payload);
          return resp.data;
     }
}

export default TicketService