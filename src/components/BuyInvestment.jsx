// /src/components/BuyInvestment.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { buySlots } from "../api/investments";

const fmtUSD = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function BuyInvestment({ property, prop, pricePerSlot: pricePerSlotProp }) {
  // accept either `property` or `prop`
  const p = property || prop || {};
  // ✅ Accept multiple id shapes
  const pId = React.useMemo(
    () => p?.id ?? p?._id ?? p?.propertyId ?? null,
    [p]
  );

  const pricePerSlot = useMemo(() => {
    if (pricePerSlotProp) return pricePerSlotProp;
    if (p?.totalValue && p?.slotsCount)
      return Number(p.totalValue) / Number(p.slotsCount);
    return null;
  }, [p, pricePerSlotProp]);

  const slotsCount = Number(p?.slotsCount ?? 0);
  const slotsSold = Number(p?.slotsSold ?? 0);
  const availableSlots = Math.max(slotsCount - slotsSold, 0);

  const [slots, setSlots] = useState(availableSlots > 0 ? 1 : 0);
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(
    () => (pricePerSlot ? pricePerSlot * (slots || 0) : 0),
    [pricePerSlot, slots]
  );

  const clamp = (val) => {
    if (!Number.isFinite(val)) return slots;
    if (val < 1) return 1;
    if (val > availableSlots) return availableSlots;
    return val;
    };
  const handleChange = (e) => setSlots(clamp(Number(e.target.value)));
  const dec = () => setSlots((s) => clamp((s || 1) - 1));
  const inc = () => setSlots((s) => clamp((s || 0) + 1));

  const missingId = !pId;
  const warned = useRef(false);
  useEffect(() => {
    if (missingId && !warned.current) {
      alert("Missing property id. Please refresh and try again.");
      warned.current = true;
    }
  }, [missingId]);

  const handleInvest = async () => {
    if (missingId) {
      alert("Missing property id. Cannot proceed with investment.");
      return;
    }
    if (!availableSlots) {
      alert("No slots available.");
      return;
    }
    if (!pricePerSlot) {
      alert("Price per slot unavailable.");
      return;
    }
    try {
      setLoading(true);
      const res = await buySlots(pId, slots);
      alert(`Investment successful: ${JSON.stringify(res.data)}`);
      // optionally refresh property state here
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Something went wrong with the investment"
      );
    } finally {
      setLoading(false);
    }
  };

  const soldOut = availableSlots === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-gray-300/50 p-6 border border-gray-100 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b border-gray-200 pb-2">
        Investment Summary
      </h3>

      {missingId && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
          Missing property id. Please refresh the page or open the property again.
        </div>
      )}

      <div className="space-y-3 text-sm">
        {p?.goalAmount != null && <Row k="Goal" v={fmtUSD(p.goalAmount)} />}
        <Row k="Raised" v={fmtUSD(p?.currentAmount)} />
        <Row k="Annual Return" v={p?.annualReturn || "—"} />
        <Row k="Distribution" v={p?.distribution || "—"} />
        <Row k="Term" v={p?.maxTerm || "—"} />
        <Row k="Security" v={p?.financialTerms?.security || "—"} />
        <Row k="Price / Slot" v={pricePerSlot ? fmtUSD(pricePerSlot) : "—"} />
        <Row k="Available Slots" v={availableSlots} />
      </div>

      {/* Slot Input */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Slots
        </label>
        <div className="flex items-stretch">
          <button
            type="button"
            onClick={dec}
            disabled={missingId || soldOut || slots <= 1}
            className="px-3 rounded-l-lg border border-r-0 border-gray-300 text-gray-700 disabled:opacity-50"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={availableSlots || 1}
            value={slots}
            onChange={handleChange}
            disabled={missingId || soldOut}
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#5927e3] outline-none disabled:bg-gray-50"
          />
          <button
            type="button"
            onClick={inc}
            disabled={missingId || soldOut || slots >= availableSlots}
            className="px-3 rounded-r-lg border border-l-0 border-gray-300 text-gray-700 disabled:opacity-50"
          >
            +
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {soldOut
            ? "Sold out"
            : `You can buy up to ${availableSlots} slot${availableSlots > 1 ? "s" : ""}.`}
        </p>
      </div>

      {/* Total Price */}
      <div className="mt-3 text-sm text-gray-700">
        Total Price: <span className="font-semibold">{fmtUSD(totalPrice)}</span>
      </div>

      {/* Invest Button */}
      <button
        onClick={handleInvest}
        disabled={missingId || loading || soldOut || !pricePerSlot}
        className="w-full mt-5 inline-flex justify-center items-center py-3 px-5 text-white font-medium rounded-lg shadow-md transition duration-300 hover:scale-105 disabled:opacity-50"
        style={{ backgroundColor: "#5927e3" }}
      >
        {missingId
          ? "Property Unavailable"
          : loading
          ? "Processing..."
          : soldOut
          ? "Sold Out"
          : "Invest Now"}
      </button>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{k}</span>
      <span className="font-medium text-gray-900">{String(v ?? "—")}</span>
    </div>
  );
}
