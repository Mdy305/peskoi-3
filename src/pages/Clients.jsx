import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    given_name: "",
    family_name: "",
    phone_number: "",
    email_address: "",
    note: "",
  });

  const queryClient = useQueryClient();

  // Fetch clients from Square
  const { data: clientsData, isLoading } = useQuery({
    queryKey: ["squareCustomers"],
    queryFn: async () => {
      const res = await base44.functions.invoke("squareGetCustomers", {});
      return res.data?.customers || [];
    },
  });

  // Fetch bookings for selected client
  const { data: bookingsData } = useQuery({
    queryKey: ["clientBookings", selectedClient?.id],
    queryFn: async () => {
      const res = await base44.functions.invoke("squareGetBookings", {
        customer_id: selectedClient.id,
      });
      return res.data?.bookings || [];
    },
    enabled: !!selectedClient,
  });

  // Fetch product recommendations for selected client
  const { data: recommendations = [] } = useQuery({
    queryKey: ["clientRecommendations", selectedClient?.id],
    queryFn: async () => {
      const phone = selectedClient?.phone_number;
      if (!phone) return [];
      const allRecs = await base44.entities.ProductRecommendation.filter({
        client_phone: phone,
      });
      return allRecs;
    },
    enabled: !!selectedClient,
  });

  const createClientMutation = useMutation({
    mutationFn: (data) => base44.functions.invoke("createClient", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["squareCustomers"]);
      setShowAddForm(false);
      setFormData({
        given_name: "",
        family_name: "",
        phone_number: "",
        email_address: "",
        note: "",
      });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: ({ customer_id, data }) =>
      base44.functions.invoke("squareUpdateCustomer", { customer_id, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["squareCustomers"]);
      setSelectedClient(null);
    },
  });

  const clients = clientsData || [];
  const filteredClients = clients.filter((client) => {
    const fullName =
      `${client.given_name || ""} ${client.family_name || ""}`.toLowerCase();
    const phone = client.phone_number || "";
    const email = client.email_address || "";
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      phone.includes(search) ||
      email.includes(search)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      updateClientMutation.mutate({
        customer_id: selectedClient.id,
        data: formData,
      });
    } else {
      createClientMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-xs text-white/40 tracking-[0.15em] uppercase mb-8">
            Clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-b border-white/[0.08] pb-3 text-sm focus:outline-none focus:border-white/20"
            />
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setSelectedClient(null);
                setFormData({
                  given_name: "",
                  family_name: "",
                  phone_number: "",
                  email_address: "",
                  note: "",
                });
              }}
              className="border border-white/[0.08] px-6 py-3 hover:border-white/20 transition-colors text-sm tracking-wide whitespace-nowrap"
            >
              {showAddForm ? "Cancel" : "+ Add Client"}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || selectedClient) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/[0.08] p-6 sm:p-8 mb-12"
          >
            <p className="text-sm text-white/80 mb-6">
              {selectedClient ? "Edit client" : "Add new client"}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.given_name}
                  onChange={(e) =>
                    setFormData({ ...formData, given_name: e.target.value })
                  }
                  className="bg-transparent border-b border-white/[0.08] pb-3 text-sm focus:outline-none focus:border-white/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.family_name}
                  onChange={(e) =>
                    setFormData({ ...formData, family_name: e.target.value })
                  }
                  className="bg-transparent border-b border-white/[0.08] pb-3 text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-sm focus:outline-none focus:border-white/20"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email_address}
                onChange={(e) =>
                  setFormData({ ...formData, email_address: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-sm focus:outline-none focus:border-white/20"
              />
              <textarea
                placeholder="Notes"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="w-full bg-transparent border border-white/[0.08] p-4 text-sm focus:outline-none focus:border-white/20 h-24"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={
                    createClientMutation.isPending ||
                    updateClientMutation.isPending
                  }
                  className="border border-white/[0.08] px-6 py-3 hover:bg-white/5 transition-colors text-sm disabled:opacity-30"
                >
                  {createClientMutation.isPending ||
                  updateClientMutation.isPending
                    ? "Saving..."
                    : "Save"}
                </button>
                {selectedClient && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClient(null);
                      setFormData({
                        given_name: "",
                        family_name: "",
                        phone_number: "",
                        email_address: "",
                        note: "",
                      });
                    }}
                    className="text-sm text-white/40 hover:text-white/60"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {/* Client List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Client List */}
          <div className="space-y-4">
            {filteredClients.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-12">
                No clients found
              </p>
            ) : (
              filteredClients.map((client) => (
                <motion.button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client);
                    setShowAddForm(false);
                    setFormData({
                      given_name: client.given_name || "",
                      family_name: client.family_name || "",
                      phone_number: client.phone_number || "",
                      email_address: client.email_address || "",
                      note: client.note || "",
                    });
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`w-full text-left border p-6 hover:border-white/20 transition-all ${
                    selectedClient?.id === client.id
                      ? "border-white/20 bg-white/[0.03]"
                      : "border-white/[0.08]"
                  }`}
                >
                  <p className="text-sm text-white/80 mb-2">
                    {client.given_name} {client.family_name}
                  </p>
                  <div className="space-y-1 text-xs text-white/40">
                    {client.phone_number && <p>{client.phone_number}</p>}
                    {client.email_address && <p>{client.email_address}</p>}
                  </div>
                </motion.button>
              ))
            )}
          </div>

          {/* Right: Client Details */}
          {selectedClient && (
            <motion.div
              key={selectedClient.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Booking History */}
              <div>
                <p className="text-xs text-white/30 tracking-[0.15em] uppercase mb-6">
                  Booking history
                </p>
                {bookingsData && bookingsData.length > 0 ? (
                  <div className="space-y-3">
                    {bookingsData.map((booking) => (
                      <div
                        key={booking.id}
                        className="border-b border-white/[0.05] pb-3"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm text-white/80">
                            {booking.appointment_segments?.[0]
                              ?.service_variation_version?.name || "Service"}
                          </p>
                          <span className="text-xs text-white/40">
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/40">
                          {new Date(booking.start_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/40">No bookings</p>
                )}
              </div>

              {/* Product Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <p className="text-xs text-white/30 tracking-[0.15em] uppercase mb-6">
                    Product recommendations
                  </p>
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="border-b border-white/[0.05] pb-3"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm text-white/80">
                            {rec.service_completed}
                          </p>
                          <span className="text-xs text-white/40">
                            {rec.status}
                          </span>
                        </div>
                        {rec.products_recommended && (
                          <div className="space-y-1">
                            {rec.products_recommended.map((prod, idx) => (
                              <p key={idx} className="text-xs text-white/40">
                                • {prod.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedClient.note && (
                <div>
                  <p className="text-xs text-white/30 tracking-[0.15em] uppercase mb-6">
                    Notes
                  </p>
                  <p className="text-sm text-white/60">{selectedClient.note}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
