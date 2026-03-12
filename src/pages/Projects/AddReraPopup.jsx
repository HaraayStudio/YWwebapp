// import { useState } from "react";
// import { useCreateReraProject } from "../../api/hooks/useRera";
// import styles from "./AddReraPopup.module.scss";

// export default function AddReraPopup({ projectId, onClose }) {
//   const { mutate, isPending } = useCreateReraProject();

//   const [formData, setFormData] = useState({
//     reraNumber: "",
//     registrationDate: "",
//     expectedCompletionDate: "",
//     active: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = () => {
//     const payload = {
//       ...formData,
//     };

//     mutate(
//       {
//         projectId: Number(projectId),
//         data: payload,
//       },
//       {
//         onSuccess: () => {
//           onClose();
//         },
//       },
//     );
//   };

//   return (
//     <div className={styles.overlay} onClick={onClose}>
//       <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className={styles.header}>
//           <div className={styles.headerLeft}>
//             <span className={styles.headerIcon}>📋</span>
//             <h3>Add RERA Details</h3>
//           </div>
//           <button className={styles.closeBtn} onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className={styles.body}>
//           <div className={styles.grid}>
//             <div className={`${styles.formGroup} ${styles.fullWidth}`}>
//               <label>
//                 RERA Number <span className={styles.required}>*</span>
//               </label>
//               <input
//                 name="reraNumber"
//                 placeholder="e.g. P52100012345"
//                 value={formData.reraNumber}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Registration Date</label>
//               <input
//                 type="date"
//                 name="registrationDate"
//                 value={formData.registrationDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Expected Completion Date</label>
//               <input
//                 type="date"
//                 name="expectedCompletionDate"
//                 value={formData.expectedCompletionDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className={styles.toggleRow}>
//             <span className={styles.toggleLabel}>Active Registration</span>
//             <label className={styles.toggle}>
//               <input
//                 type="checkbox"
//                 name="active"
//                 checked={formData.active}
//                 onChange={handleChange}
//               />
//               <span className={styles.slider}></span>
//             </label>
//             <span className={styles.toggleStatus}>
//               {formData.active ? "Active" : "Inactive"}
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className={styles.footer}>
//           <button className={styles.cancelBtn} onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className={styles.submitBtn}
//             onClick={handleSubmit}
//             disabled={isPending || !formData.reraNumber}
//           >
//             {isPending ? (
//               <>
//                 <span className={styles.spinner}></span>
//                 Saving...
//               </>
//             ) : (
//               "Save RERA"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useSaveFullReraProject } from "../../api/hooks/useRera";
import styles from "./AddReraPopup.module.scss";

// ─── Tabs (mirrors EditSiteVisitPopup exactly) ────────────────────────────────
const TABS = [
  { id: "info", label: "Info", icon: "🗒️" },
  { id: "certificates", label: "Certificates", icon: "📎" },
];

// ─── Empty certificate entry template ────────────────────────────────────────
const emptyCert = () => ({
  completionPercentage: "",
  certificateDate: "",
  remarks: "",
  certifiedBy: "",
  stageId: "",
  _file: null, // the uploaded file, matched by index to certificateFiles[]
});

// ─── Empty quarter-update entry template ──────────────────────────────────────
const emptyQuarter = () => ({
  constructionStatus: "",
  salesStatus: "",
  quarterDate: "",
});

export default function AddReraPopup({ projectId, onClose, onSuccess }) {
  const { mutate: saveFullRera, isPending } = useSaveFullReraProject();

  const [activeTab, setActiveTab] = useState("info");

  // ── Info tab state ──────────────────────────────────────────────────────────
  const [reraNumber, setReraNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [expectedCompletionDate, setExpectedCompletionDate] = useState("");
  const [active, setActive] = useState(true);

  // ── Certificates state (list of cert rows + their files) ────────────────────
  const [certificates, setCertificates] = useState([emptyCert()]);

  // ── Quarter Updates state ────────────────────────────────────────────────────
  const [quarterUpdates, setQuarterUpdates] = useState([]);

  // ── File input refs (one per cert row) — we use a single hidden input trick ──
  const certFileRefs = useRef({});

  // ─── Badge count for Certificates tab ────────────────────────────────────────
  const certCount =
    certificates.filter((c) => c._file || c.completionPercentage).length +
    quarterUpdates.length;

  // ─── Certificate helpers ──────────────────────────────────────────────────────
  const updateCert = (idx, field, value) => {
    setCertificates((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)),
    );
  };

  const setCertFile = (idx, file) => {
    setCertificates((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, _file: file } : c)),
    );
  };

  const addCert = () => setCertificates((prev) => [...prev, emptyCert()]);

  const removeCert = (idx) =>
    setCertificates((prev) => prev.filter((_, i) => i !== idx));

  // ─── Quarter-update helpers ───────────────────────────────────────────────────
  const updateQuarter = (idx, field, value) => {
    setQuarterUpdates((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q)),
    );
  };

  const addQuarter = () =>
    setQuarterUpdates((prev) => [...prev, emptyQuarter()]);

  const removeQuarter = (idx) =>
    setQuarterUpdates((prev) => prev.filter((_, i) => i !== idx));

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const reraData = {
      projectId: projectId,
      reraNumber: reraNumber.trim(),
      registrationDate: registrationDate || null,
      expectedCompletionDate: expectedCompletionDate || null,
      active,
      // Certificates: strip the _file field, keep only DTO-matching fields
      certificates: certificates
        .filter((c) => c.completionPercentage || c.certificateDate)
        .map(({ _file, ...dto }) => ({
          completionPercentage: dto.completionPercentage
            ? Number(dto.completionPercentage)
            : null,
          certificateDate: dto.certificateDate || null,
          remarks: dto.remarks.trim() || null,
          certifiedBy: dto.certifiedBy ? Number(dto.certifiedBy) : null,
          stageId: dto.stageId ? Number(dto.stageId) : null,
        })),
      // Quarter updates
      quarterUpdates: quarterUpdates
        .filter((q) => q.quarterDate || q.constructionStatus)
        .map((q) => ({
          constructionStatus: q.constructionStatus.trim() || null,
          salesStatus: q.salesStatus.trim() || null,
          quarterDate: q.quarterDate || null,
        })),
    };

    // Certificate files — aligned by index with certificates[] (null gaps are ok
    // because the backend uses the same positional index from the JSON array)
    const certificateFiles = certificates
      .filter((c) => c.completionPercentage || c.certificateDate)
      .map((c) => c._file)
      .filter(Boolean);

    saveFullRera(
      { reraData, certificateFiles },
      {
        onSuccess: (res) => {
          onSuccess?.(res);
          onClose();
        },
      },
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* ── HEADER ── */}
        <div className={styles.header}>
          <h3>Add RERA Registration</h3>
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* ── TABS ── */}
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
              {tab.id === "certificates" && certCount > 0 && (
                <span className={styles.tabBadge}>{certCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── BODY ── */}
        <div className={styles.body}>
          {/* ══════════════════ INFO PANEL ══════════════════ */}
          <div
            className={`${styles.tabPanel} ${activeTab === "info" ? styles.visible : ""}`}
          >
            {/* RERA Number */}
            <div className={styles.formGroup}>
              <label>RERA Number *</label>
              <input
                value={reraNumber}
                onChange={(e) => setReraNumber(e.target.value)}
                placeholder="e.g. P52100012345"
              />
            </div>

            {/* Dates row */}
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>Registration Date</label>
                <input
                  type="date"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Expected Completion</label>
                <input
                  type="date"
                  value={expectedCompletionDate}
                  onChange={(e) => setExpectedCompletionDate(e.target.value)}
                />
              </div>
            </div>

            {/* Active toggle */}
            <div className={styles.formGroup}>
              <label>Status</label>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  {active ? "Active Registration" : "Inactive Registration"}
                </span>
                <button
                  type="button"
                  className={`${styles.toggle} ${active ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => setActive((v) => !v)}
                  aria-label="Toggle active"
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>
            </div>
          </div>

          {/* ══════════════════ CERTIFICATES PANEL ══════════════════ */}
          <div
            className={`${styles.tabPanel} ${activeTab === "certificates" ? styles.visible : ""}`}
          >
            {/* ── Certificates section ── */}
            <div>
              <p className={styles.sectionLabel}>Certificates</p>
              <div className={styles.sectionCard}>
                {certificates.length === 0 ? (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📋</span>
                    No certificates added yet
                  </div>
                ) : (
                  <div className={styles.certList}>
                    {certificates.map((cert, idx) => (
                      <div key={idx} className={styles.certCard}>
                        {/* cert card header */}
                        <div className={styles.certCardHeader}>
                          <span className={styles.certCardTitle}>
                            Certificate #{idx + 1}
                          </span>
                          {certificates.length > 1 && (
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeCert(idx)}
                              title="Remove certificate"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* cert fields grid */}
                        <div className={styles.certGrid}>
                          <div className={styles.formGroup}>
                            <label>Completion %</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              step={0.01}
                              placeholder="e.g. 45.5"
                              value={cert.completionPercentage}
                              onChange={(e) =>
                                updateCert(
                                  idx,
                                  "completionPercentage",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Certificate Date</label>
                            <input
                              type="date"
                              value={cert.certificateDate}
                              onChange={(e) =>
                                updateCert(
                                  idx,
                                  "certificateDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Certified By (Employee ID)</label>
                            <input
                              type="number"
                              placeholder="Employee ID"
                              value={cert.certifiedBy}
                              onChange={(e) =>
                                updateCert(idx, "certifiedBy", e.target.value)
                              }
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Stage ID (optional)</label>
                            <input
                              type="number"
                              placeholder="Project Stage ID"
                              value={cert.stageId}
                              onChange={(e) =>
                                updateCert(idx, "stageId", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* remarks full width */}
                        <div className={styles.formGroup}>
                          <label>Remarks</label>
                          <textarea
                            placeholder="Any notes about this certificate…"
                            value={cert.remarks}
                            onChange={(e) =>
                              updateCert(idx, "remarks", e.target.value)
                            }
                          />
                        </div>

                        {/* file upload row — mirrors Add Photos pattern */}
                        <div className={styles.addRow}>
                          {cert._file ? (
                            <div className={styles.docItem}>
                              <span className={styles.docIcon}>📄</span>
                              <span className={styles.docName}>
                                {cert._file.name}
                              </span>
                              <button
                                className={styles.docDeleteBtn}
                                title="Remove file"
                                onClick={() => setCertFile(idx, null)}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className={styles.addBtnWrapper}>
                              <button className={styles.addBtn}>
                                <span className={styles.addIcon}>＋</span>
                                Upload Certificate File
                              </button>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  opacity: 0,
                                  cursor: "pointer",
                                }}
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    setCertFile(idx, e.target.files[0]);
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add certificate button */}
                <div className={styles.addRow}>
                  <button className={styles.addBtn} onClick={addCert}>
                    <span className={styles.addIcon}>＋</span>
                    Add Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* ── Quarter Updates section ── */}
            <div>
              <p className={styles.sectionLabel}>Quarter Updates</p>
              <div className={styles.sectionCard}>
                {quarterUpdates.length === 0 ? (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📅</span>
                    No quarter updates added yet
                  </div>
                ) : (
                  <div className={styles.certList}>
                    {quarterUpdates.map((q, idx) => (
                      <div key={idx} className={styles.certCard}>
                        <div className={styles.certCardHeader}>
                          <span className={styles.certCardTitle}>
                            Q{idx + 1} Update
                          </span>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeQuarter(idx)}
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>

                        <div className={styles.certGrid}>
                          <div className={styles.formGroup}>
                            <label>Quarter Date</label>
                            <input
                              type="date"
                              value={q.quarterDate}
                              onChange={(e) =>
                                updateQuarter(
                                  idx,
                                  "quarterDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Construction Status</label>
                            <input
                              placeholder="e.g. Foundation complete"
                              value={q.constructionStatus}
                              onChange={(e) =>
                                updateQuarter(
                                  idx,
                                  "constructionStatus",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div
                            className={`${styles.formGroup} ${styles.spanFull}`}
                          >
                            <label>Sales Status</label>
                            <input
                              placeholder="e.g. 30% units booked"
                              value={q.salesStatus}
                              onChange={(e) =>
                                updateQuarter(
                                  idx,
                                  "salesStatus",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.addRow}>
                  <button className={styles.addBtn} onClick={addQuarter}>
                    <span className={styles.addIcon}>＋</span>
                    Add Quarter Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isPending || !reraNumber.trim()}
          >
            {isPending ? "Saving…" : "Save RERA"}
          </button>
        </div>
      </div>
    </div>
  );
}
