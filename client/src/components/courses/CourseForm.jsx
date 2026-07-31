import { useState } from "react";

function CourseForm({ initialData = {}, onSubmit, submitLabel = "Save", onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    type: initialData.type || "Beginner",
    description: initialData.description || "",
    price: initialData.price || "",
    lessonCount: initialData.lessonCount || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="Beginner">Beginner</option>
            <option value="Refresher">Refresher</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Price (Rs.)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Lesson Count</label>
          <input
            type="number"
            name="lessonCount"
            value={formData.lessonCount}
            onChange={handleChange}
            required
            min="1"
            className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-secondary mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          rows={2}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-700 text-text-primary px-4 py-2 rounded hover:bg-slate-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CourseForm;