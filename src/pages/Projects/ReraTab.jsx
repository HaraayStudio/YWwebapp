import { useState } from "react";
import styles from "./ReraTab.module.scss";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fmtDateTime = (dt) => {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Small shared pieces ──────────────────────────────────────────────────────
const InfoField = ({ label, value, mono }) => (
  <div className={styles.infoField}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={`${styles.fieldValue} ${mono ? styles.mono : ""}`}>
      {value || "—"}
    </span>
  </div>
);

const ActiveBadge = ({ active }) =>
  active ? (
    <span className={`${styles.badge} ${styles.badgeActive}`}>
      <span className={styles.badgeDot} /> Active
    </span>
  ) : (
    <span className={`${styles.badge} ${styles.badgeInactive}`}>
      <span className={styles.badgeDot} /> Inactive
    </span>
  );

const SectionTitle = ({ icon, title, count }) => (
  <div className={styles.sectionTitle}>
    <span className={styles.sectionIcon}>{icon}</span>
    <span>{title}</span>
    {count != null && count > 0 && (
      <span className={styles.countPill}>{count}</span>
    )}
  </div>
);

// ─── Certificate Card ─────────────────────────────────────────────────────────
const CertCard = ({ cert, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.certCard} ${open ? styles.certCardOpen : ""}`}>
      {/* collapsed header — always visible */}
      <div className={styles.certCardHeader} onClick={() => setOpen((v) => !v)}>
        <div className={styles.certCardLeft}>
          <span className={styles.certIndex}>#{index + 1}</span>
          <span className={styles.certDate}>
            {fmtDate(cert.certificateDate)}
          </span>
          {cert.certificateFileUrl && (
            <span className={styles.fileChip}>📄 File attached</span>
          )}
        </div>
        <div className={styles.certCardRight}>
          <span className={styles.chevron}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* expanded body */}
      {open && (
        <div className={styles.certCardBody}>
          <div className={styles.infoGrid}>
            <InfoField
              label="Certificate Date"
              value={fmtDate(cert.certificateDate)}
            />
            <InfoField
              label="Certified By (ID)"
              value={cert.certifiedBy ?? "—"}
              mono
            />
            <InfoField label="Added On" value={fmtDateTime(cert.createdAt)} />
          </div>

          {cert.remarks && (
            <div className={styles.remarksBlock}>
              <span className={styles.fieldLabel}>Remarks</span>
              <p className={styles.remarksText}>{cert.remarks}</p>
            </div>
          )}

          {cert.certificateFileUrl && (
            <a
              href={cert.certificateFileUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.fileLink}
            >
              📄 View Certificate File
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Quarter Update Card ──────────────────────────────────────────────────────
const QuarterCard = ({ q, index }) => (
  <div className={styles.quarterCard}>
    <div className={styles.quarterHeader}>
      <span className={styles.quarterLabel}>Q{index + 1}</span>
      <span className={styles.quarterDate}>{fmtDate(q.quarterDate)}</span>
    </div>
    <div className={styles.quarterBody}>
      {q.constructionStatus && (
        <div className={styles.quarterRow}>
          <span className={styles.fieldLabel}>Construction</span>
          <span className={styles.quarterValue}>{q.constructionStatus}</span>
        </div>
      )}
      {q.salesStatus && (
        <div className={styles.quarterRow}>
          <span className={styles.fieldLabel}>Sales</span>
          <span className={styles.quarterValue}>{q.salesStatus}</span>
        </div>
      )}
    </div>
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyBlock = ({ icon, text }) => (
  <div className={styles.emptyBlock}>
    <span className={styles.emptyIcon}>{icon}</span>
    <p>{text}</p>
  </div>
);

// ─── Main ReraTab ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   rera       — ReraProjectDTO | null
 *   isLoading  — boolean
 *   onAddRera  — () => void   (opens AddReraPopup)
 */
const ReraTab = ({ rera, isLoading, onAddRera }) => {
  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.skeletonCard} />
        <div className={styles.skeletonCard} style={{ height: 120 }} />
      </div>
    );
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!rera) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sectionHeader}>
          <h3>RERA Details</h3>
          <button className={styles.primaryBtn} onClick={onAddRera}>
            + Add RERA
          </button>
        </div>
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🏛️</span>
          <p>No RERA information added yet.</p>
          <button className={styles.addReraBtn} onClick={onAddRera}>
            + Add RERA Registration
          </button>
        </div>
      </div>
    );
  }

  const certs = rera.certificates ?? [];
  const updates = rera.quarterUpdates ?? [];

  // ── Populated display ───────────────────────────────────────────────────────
  return (
    <div className={styles.wrapper}>
      {/* ── Section header ── */}
      <div className={styles.sectionHeader}>
        <h3>RERA Details</h3>
        {/* already registered — no add button */}
      </div>

      {/* ══════════ Card 1: Core Info ══════════ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <SectionTitle icon="◈" title="Registration Info" />
          <ActiveBadge active={rera.active} />
        </div>

        <div className={styles.infoGrid}>
          <InfoField label="RERA Number" value={rera.reraNumber} mono />
          <InfoField
            label="Registration Date"
            value={fmtDate(rera.registrationDate)}
          />
          <InfoField
            label="Expected Completion"
            value={fmtDate(rera.expectedCompletionDate)}
          />
          <InfoField
            label="RERA Record ID"
            value={rera.id ? `#${rera.id}` : "—"}
            mono
          />
          <InfoField label="Created At" value={fmtDateTime(rera.createdAt)} />
          <InfoField label="Last Updated" value={fmtDateTime(rera.updatedAt)} />
        </div>
      </div>

      {/* ══════════ Card 2: Certificates ══════════ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <SectionTitle icon="📋" title="Certificates" count={certs.length} />
        </div>

        {certs.length === 0 ? (
          <EmptyBlock icon="📋" text="No certificates attached to this RERA." />
        ) : (
          <div className={styles.certList}>
            {certs.map((cert, i) => (
              <CertCard key={cert.id ?? i} cert={cert} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ══════════ Card 3: Quarter Updates ══════════ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <SectionTitle
            icon="📅"
            title="Quarter Updates"
            count={updates.length}
          />
        </div>

        {updates.length === 0 ? (
          <EmptyBlock icon="📅" text="No quarterly updates recorded yet." />
        ) : (
          <div className={styles.quarterGrid}>
            {updates.map((q, i) => (
              <QuarterCard key={q.id ?? i} q={q} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReraTab;
