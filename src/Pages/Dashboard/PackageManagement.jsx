import { useState } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

export default function PackageManagement() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Basic Plan",
      price: 9.99,
      duration: "monthly",
      features: ["5 Projects", "Basic Support", "10GB Storage"],
      status: "active",
      description: "Perfect for individuals getting started",
    },
    {
      id: 2,
      name: "Pro Plan",
      price: 29.99,
      duration: "monthly",
      features: [
        "Unlimited Projects",
        "Priority Support",
        "100GB Storage",
        "Advanced Analytics",
      ],
      status: "active",
      description: "Ideal for growing businesses",
    },
    {
      id: 3,
      name: "Enterprise",
      price: 99.99,
      duration: "monthly",
      features: [
        "Everything in Pro",
        "Custom Integrations",
        "Dedicated Support",
        "Unlimited Storage",
      ],
      status: "inactive",
      description: "For large organizations with custom needs",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "monthly",
    features: "",
    status: "active",
    description: "",
  });

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const subscriptionData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
    };

    if (editingSubscription) {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === editingSubscription.id
            ? { ...subscriptionData, id: editingSubscription.id }
            : sub
        )
      );
    } else {
      setSubscriptions((prev) => [
        ...prev,
        {
          ...subscriptionData,
          id: Date.now(),
        },
      ]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      duration: "monthly",
      features: "",
      status: "active",
      description: "",
    });
    setEditingSubscription(null);
    setIsDialogOpen(false);
  };

  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setFormData({
      name: "",
      price: "",
      duration: "monthly",
      features: "",
      status: "active",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      name: subscription.name,
      price: subscription.price.toString(),
      duration: subscription.duration,
      features: subscription.features.join(", "),
      status: subscription.status,
      description: subscription.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
              Subcriptions Management
            </h1>
            <p className="text-[#6A6D57]/80 mt-3">
              Manage and monitor your subcriptions with ease
            </p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mb-6">
          <button
            onClick={handleAddSubscription}
            className="inline-flex items-center px-4 py-2 bg-[#6A6D57] text-white rounded-lg hover:bg-[#585a48] transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription
          </button>
        </div>

        {/* Modal */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {editingSubscription
                    ? "Edit Subscription"
                    : "Add New Subscription"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {editingSubscription
                    ? "Update the subscription plan details below."
                    : "Create a new subscription plan for your customers."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Plan Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Basic Plan"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price ($)
                      </label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        placeholder="9.99"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Billing Duration
                      </label>
                      <select
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the plan..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="features"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Features (comma-separated)
                    </label>
                    <textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          features: e.target.value,
                        }))
                      }
                      placeholder="5 Projects, Basic Support, 10GB Storage"
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border  text-[#6A6D57] font-semibold rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#6A6D57] text-white rounded-lg hover:bg-[#585a48] transition-colors"
                    >
                      {editingSubscription
                        ? "Update Subscription"
                        : "Create Subscription"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {subscription.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {subscription.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${subscription.price}
                  </span>
                  <span className="text-gray-500">
                    /{subscription.duration}
                  </span>
                </div>
              </div>

              {/* Card Content - Features */}
              <div className="px-6 pb-6 flex-grow">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-[#6A6D57] rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subscriptions found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first subscription plan to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
