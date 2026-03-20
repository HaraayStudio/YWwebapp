import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClientById, useUpdateClient } from "../../api/hooks/useClient";
import styles from "./EditClient.module.scss";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../../components/Notification/toast";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useClientById(id);
  const { mutate, isPending } = useUpdateClient();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "", // always stored as STRING in state for input control
    address: "",
    gstcertificate: "",
    pan: "",
  });

  const [errors, setErrors] = useState({});

  /* ===============================
     LOAD PREVIOUS DATA
     ClientDTO fields: id, name, email, phone (Long), address, gstcertificate, PAN
  =============================== */
  useEffect(() => {
    if (!data) return;
    setFormData({
      id: data.id ?? "",
      name: data.name ?? "", // ✅ backend field is "name" not "clientName"
      email: data.email ?? "",
      // phone comes as Long from backend — convert to string for the input
      phone: data.phone != null ? String(data.phone) : "",
      address: data.address ?? "",
      gstcertificate: data.gstcertificate ?? "",
      pan: data.pan ?? "",
    });
  }, [data]);

  /* ===============================
     VALIDATION
  =============================== */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Client name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone: required, exactly 10 digits
    if (!formData.phone) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===============================
     INPUT HANDLER
  =============================== */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  /* ===============================
     SUBMIT
     ClientINEPAGPDTO: { id, name, email, phone (Long), address, gstcertificate, PAN }
  =============================== */
  const handleSubmit = () => {
    if (!validate()) return;

    const loadingToast = showLoading("Updating client...");

    mutate(
      {
        id: formData.id,
        data: {
          name: formData.name,
          email: formData.email,
          // backend expects Long — convert string → number
          phone: Number(formData.phone),
          address: formData.address,
          gstcertificate: formData.gstcertificate,
          pan: formData.pan,
        },
      },
      {
        onSuccess: () => {
          dismissToast(loadingToast);
          showSuccess("Client updated successfully!");
          navigate("/clients/allclients");
        },
        onError: (err) => {
          dismissToast(loadingToast);
          showError(err?.response?.data?.message || "Failed to update client.");
          console.error("Update failed:", err);
        },
      },
    );
  };

  /* ===============================
     LOADING / ERROR STATES
  =============================== */
  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Loading client data…</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>Failed to load client.</div>
      </div>
    );
  }

  /* ===============================
     UI
  =============================== */
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.breadcrumb}>Clients &gt; Edit Client</div>
      <div className={styles.pageTitle}>Edit Client</div>

      <div className={styles.card}>
        <div className={styles.formGrid}>
          {/* CLIENT NAME */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Client Name</label>
            <input
              className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
              value={formData.name}
              placeholder="Enter client name"
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          {/* EMAIL */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
              value={formData.email}
              placeholder="Enter email address"
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* PHONE — digits only, max 10 */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
              value={formData.phone}
              placeholder="Enter 10-digit phone number"
              onChange={(e) => {
                // Strip any non-digit characters before storing
                const digits = e.target.value.replace(/\D/g, "");
                handleChange("phone", digits);
              }}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          {/* GST */}
          <div className={styles.formGroup}>
            <label className={styles.label}>GST Certificate</label>
            <input
              className={styles.input}
              value={formData.gstcertificate}
              placeholder="Enter GST number"
              onChange={(e) =>
                handleChange("gstcertificate", e.target.value.toUpperCase())
              }
            />
          </div>

          {/* PAN */}
          <div className={styles.formGroup}>
            <label className={styles.label}>PAN</label>
            <input
              className={styles.input}
              value={formData.pan}
              placeholder="e.g. ABCDE1234F"
              onChange={(e) =>
                handleChange("pan", e.target.value.toUpperCase())
              }
            />
          </div>

          {/* ADDRESS */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Address</label>
            <textarea
              className={styles.input}
              value={formData.address}
              placeholder="Enter address"
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className={styles.actionRow}>
        <button
          className={styles.buttonSecondary}
          onClick={() => navigate(-1)}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          className={styles.buttonPrimary}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Updating…" : "Update Client"}
        </button>
      </div>
    </div>
  );
};

export default EditClient;
