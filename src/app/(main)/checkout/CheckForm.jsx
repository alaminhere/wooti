'use client';

const CheckForm = ({ form, setForm }) => {
  const inputClass =
    'w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none transition-colors focus:border-teal-700 placeholder:text-gray-400';

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <div className="w-full space-y-3 bg-white border  border-gray-200 rounded-[8px]  p-4">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          required
          name="fullName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Full name"
          className={inputClass}
        />

        <input
          required
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <input
          required
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className={inputClass}
        />

        <input
          required
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className={inputClass}
        />
        <input
          required
          name="zip"
          value={form.zip}
          onChange={handleChange}
          placeholder="zip code"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClass}
        />

        <input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+880 ..."
          className={inputClass}
        />
      </div>

      <textarea
        required
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Order Notes (Optional)"
        rows={3}
        className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none resize-y transition-colors focus:border-teal-700 placeholder:text-gray-400"
      />
    </div>
  );
};

export default CheckForm;
