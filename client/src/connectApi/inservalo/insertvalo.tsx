import apiall from "../apiall";

const Insertvaloapi = {
    getall: async () => apiall.get("/showvalo"),
    post: async (data: any) => apiall.post("/submitcreate", data),
    put: async (id: string, data: any) => apiall.put(`/updatevalo/${id}`, data),
    delete: async (id: string) => apiall.delete(`/deletevalo/${id}`)
}

export default Insertvaloapi;
