// import React, { useMemo, useState } from "react";
// import { useClientById } from "../../api/hooks/useClient";
// import { usePostSalesByClient } from "../../api/hooks/usePostSales";
// import styles from "./ClientDashboard.module.scss";

// // ─── Icons (inline SVG) ───────────────────────────────────────────────────────
// const IconPhone = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );

// const IconMail = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );

// const IconMapPin = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

// const IconProject = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
//     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//   </svg>
// );

// const IconClipboard = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
//     <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
//   </svg>
// );

// const IconCheckCircle = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//     <polyline points="22 4 12 14.01 9 11.01" />
//   </svg>
// );

// const IconAlertCircle = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="12" y1="8" x2="12" y2="12" />
//     <line x1="12" y1="16" x2="12.01" y2="16" />
//   </svg>
// );

// const IconUser = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// const IconFileText = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="12" y1="13" x2="8" y2="13" />
//     <line x1="12" y1="17" x2="8" y2="17" />
//   </svg>
// );

// // ─── Skeleton Loader ───────────────────────────────────────────────────────────
// const Pulse = ({ h = 20, w = "100%", r = 8 }) => (
//   <div
//     className={styles.pulse}
//     style={{ height: h, width: w, borderRadius: r }}
//   />
// );

// // ─── Info Card Component ───────────────────────────────────────────────────────
// const InfoCard = ({ icon: Icon, label, value, color = "primary" }) => (
//   <div className={`${styles.infoCard} ${styles[color]}`}>
//     <div className={styles.infoCardIcon}>
//       <Icon />
//     </div>
//     <div className={styles.infoCardContent}>
//       <div className={styles.infoCardLabel}>{label}</div>
//       <div className={styles.infoCardValue}>{value || "—"}</div>
//     </div>
//   </div>
// );

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
//   <div className={`${styles.sectionCard} ${className}`}>
//     <div className={styles.sectionHead}>
//       {Icon && <Icon className={styles.sectionIcon} />}
//       <h2 className={styles.sectionTitle}>{title}</h2>
//     </div>
//     <div className={styles.sectionBody}>{children}</div>
//   </div>
// );

// // ─── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status, type = "default" }) => {
//   const statusConfig = {
//     PLANNING: { color: "#3b82f6", label: "Planning" },
//     IN_PROGRESS: { color: "#f59e0b", label: "In Progress" },
//     ON_HOLD: { color: "#ef4444", label: "On Hold" },
//     COMPLETED: { color: "#10b981", label: "Completed" },
//     CANCELLED: { color: "#6b7280", label: "Cancelled" },
//     CREATED: { color: "#8b5cf6", label: "Created" },
//     null: { color: "#9ca3af", label: "Pending" },
//   };

//   const config = statusConfig[status] || statusConfig["null"];

//   return (
//     <span
//       className={styles.statusBadge}
//       style={{
//         background: `${config.color}18`,
//         color: config.color,
//         borderColor: config.color,
//       }}
//     >
//       <span className={styles.statusDot} style={{ background: config.color }} />
//       {config.label}
//     </span>
//   );
// };

// // ─── Pre-Sales List Item ───────────────────────────────────────────────────────
// const PreSalesItem = ({ item, index }) => (
//   <div className={styles.listItem}>
//     <div className={styles.listItemHead}>
//       <div className={styles.listItemNumber}>#{item.srNumber}</div>
//       <div className={styles.listItemDate}>
//         {new Date(item.dateTime).toLocaleDateString("en-IN", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </div>
//     </div>
//     <div className={styles.listItemContent}>
//       <div className={styles.listItemField}>
//         <span className={styles.fieldLabel}>Contact Person</span>
//         <span className={styles.fieldValue}>{item.personName || "—"}</span>
//       </div>
//       <div className={styles.listItemField}>
//         <span className={styles.fieldLabel}>Approached Via</span>
//         <span className={styles.fieldValue}>{item.approachedVia || "—"}</span>
//       </div>
//       <div className={styles.listItemField}>
//         <span className={styles.fieldLabel}>Conclusion</span>
//         <span className={styles.fieldValue}>{item.conclusion || "—"}</span>
//       </div>
//       {item.status && (
//         <div className={styles.listItemField}>
//           <StatusBadge status={item.status} />
//         </div>
//       )}
//     </div>
//     {item.quotations && item.quotations.length > 0 && (
//       <div className={styles.listItemFooter}>
//         <span className={styles.quotationCount}>
//           {item.quotations.length} Quotation
//           {item.quotations.length !== 1 ? "s" : ""}
//         </span>
//       </div>
//     )}
//   </div>
// );

// // ─── Post-Sales Item ───────────────────────────────────────────────────────────
// const PostSalesItem = ({ item }) => (
//   <div className={styles.postSalesCard}>
//     <div className={styles.postSalesHead}>
//       <div className={styles.postSalesInfo}>
//         <h4 className={styles.postSalesProject}>
//           {item.project?.projectName || `Project #${item.project?.projectId}`}
//         </h4>
//         <div className={styles.postSalesMeta}>
//           <span className={styles.postSalesId}>
//             {item.project?.projectCode || "N/A"}
//           </span>
//           <span className={styles.postSalesDate}>
//             {new Date(item.postSalesdateTime).toLocaleDateString("en-IN", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}
//           </span>
//         </div>
//       </div>
//       <StatusBadge status={item.postSalesStatus} />
//     </div>

//     <div className={styles.postSalesGrid}>
//       <div className={styles.postSalesGridItem}>
//         <span className={styles.postSalesLabel}>Project Status</span>
//         <StatusBadge status={item.project?.projectStatus} />
//       </div>
//       <div className={styles.postSalesGridItem}>
//         <span className={styles.postSalesLabel}>Invoices</span>
//         <div className={styles.invoiceCount}>
//           <span className={styles.invoiceType}>
//             Proforma: {item.proformaInvoices?.length || 0}
//           </span>
//           <span className={styles.invoiceType}>
//             Tax: {item.taxInvoices?.length || 0}
//           </span>
//         </div>
//       </div>
//       <div className={styles.postSalesGridItem}>
//         <span className={styles.postSalesLabel}>Notified</span>
//         <span
//           className={styles.notificationStatus}
//           style={{
//             color: item.notified ? "#10b981" : "#ef4444",
//           }}
//         >
//           {item.notified ? "✓ Yes" : "✗ No"}
//         </span>
//       </div>
//     </div>

//     {item.remark && (
//       <div className={styles.postSalesRemark}>
//         <span className={styles.remarkLabel}>Remark</span>
//         <p className={styles.remarkText}>{item.remark}</p>
//       </div>
//     )}
//   </div>
// );

// // ─── Main Client Dashboard ────────────────────────────────────────────────────
// export default function ClientDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const clientId = user?.userId;

//   const { data: clientResponse, isLoading: clientLoading } =
//     useClientById(clientId);
//   const { data: postSalesResponse, isLoading: postsalesLoading } =
//     usePostSalesByClient(clientId);

//   // Extract data from responses
//   const clientData = clientResponse;
//   console.log(clientData);

//   const postSalesData = Array.isArray(postSalesResponse?.data)
//     ? postSalesResponse.data
//     : [];

//   const isLoading = clientLoading || postsalesLoading;

//   // Calculate statistics
//   const stats = useMemo(() => {
//     return {
//       totalPreSales: clientData?.preSales?.length || 0,
//       totalPostSales: postSalesData?.length || 0,
//       totalProjects: clientData?.postSales?.length || 0,
//       completedProjects:
//         clientData?.postSales?.filter(
//           (p) => p.project?.projectStatus === "COMPLETED",
//         )?.length || 0,
//       invoicesCount: {
//         proforma:
//           postSalesData?.reduce(
//             (sum, ps) => sum + (ps.proformaInvoices?.length || 0),
//             0,
//           ) || 0,
//         tax:
//           postSalesData?.reduce(
//             (sum, ps) => sum + (ps.taxInvoices?.length || 0),
//             0,
//           ) || 0,
//       },
//       notifiedCount: postSalesData?.filter((ps) => ps.notified)?.length || 0,
//     };
//   }, [clientData, postSalesData]);

//   if (isLoading) {
//     return (
//       <div className={styles.dashboard}>
//         <div className={styles.welcomeCard}>
//           <Pulse h={40} w={300} />
//           <Pulse h={20} w={200} />
//         </div>
//         <div className={styles.statsGrid}>
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className={styles.statCardSkeleton}>
//               <Pulse h={50} />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!clientData) {
//     return (
//       <div className={styles.dashboard}>
//         <div className={styles.emptyState}>
//           <IconAlertCircle />
//           <h2>No Client Data Found</h2>
//           <p>Unable to load your profile information</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboard}>
//       {/* ── Welcome Section ── */}
//       <div className={styles.welcomeCard}>
//         <div className={styles.welcomeContent}>
//           <div className={styles.welcomeGreeting}>Welcome back,</div>
//           <h1 className={styles.welcomeName}>{clientData.name}</h1>
//           <p className={styles.welcomeSubtitle}>
//             Manage and track your projects, invoices, and sales information
//           </p>
//         </div>
//       </div>

//       {/* ── Quick Stats ── */}
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ color: "#3b82f6" }}>
//             <IconClipboard />
//           </div>
//           <div className={styles.statContent}>
//             <div className={styles.statValue}>{stats.totalPreSales}</div>
//             <div className={styles.statLabel}>Pre-Sales</div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ color: "#f59e0b" }}>
//             <IconProject />
//           </div>
//           <div className={styles.statContent}>
//             <div className={styles.statValue}>{stats.totalPostSales}</div>
//             <div className={styles.statLabel}>Post-Sales</div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ color: "#10b981" }}>
//             <IconCheckCircle />
//           </div>
//           <div className={styles.statContent}>
//             <div className={styles.statValue}>{stats.completedProjects}</div>
//             <div className={styles.statLabel}>Completed Projects</div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ color: "#8b5cf6" }}>
//             <IconFileText />
//           </div>
//           <div className={styles.statContent}>
//             <div className={styles.statValue}>
//               {stats.invoicesCount.proforma + stats.invoicesCount.tax}
//             </div>
//             <div className={styles.statLabel}>Total Invoices</div>
//           </div>
//         </div>
//       </div>

//       {/* ── Client Information ── */}
//       <SectionCard title="My Information" icon={IconUser}>
//         <div className={styles.clientInfoGrid}>
//           <InfoCard
//             icon={IconUser}
//             label="Name"
//             value={clientData.name}
//             color="primary"
//           />
//           <InfoCard
//             icon={IconMail}
//             label="Email"
//             value={clientData.email}
//             color="info"
//           />
//           <InfoCard
//             icon={IconPhone}
//             label="Phone"
//             value={clientData.phone}
//             color="warning"
//           />
//           <InfoCard
//             icon={IconMapPin}
//             label="Address"
//             value={clientData.address}
//             color="success"
//           />
//         </div>

//         {(clientData.pan || clientData.gstcertificate) && (
//           <div className={styles.documentInfo}>
//             <h4 className={styles.documentTitle}>Documents</h4>
//             <div className={styles.documentGrid}>
//               {clientData.pan && (
//                 <div className={styles.documentItem}>
//                   <span className={styles.documentLabel}>PAN</span>
//                   <span className={styles.documentValue}>
//                     {clientData.pan || "Not Provided"}
//                   </span>
//                 </div>
//               )}
//               {clientData.gstcertificate && (
//                 <div className={styles.documentItem}>
//                   <span className={styles.documentLabel}>GST Certificate</span>
//                   <span className={styles.documentValue}>
//                     {clientData.gstcertificate || "Not Provided"}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </SectionCard>

//       {/* ── Pre-Sales Information ── */}
//       <SectionCard title="Pre-Sales Leads" icon={IconClipboard}>
//         {clientData.preSales && clientData.preSales.length > 0 ? (
//           <div className={styles.listContainer}>
//             {clientData.preSales.map((preSale, index) => (
//               <PreSalesItem key={index} item={preSale} index={index} />
//             ))}
//           </div>
//         ) : (
//           <div className={styles.emptyStateInline}>
//             <IconAlertCircle />
//             <p>No pre-sales records found</p>
//           </div>
//         )}
//       </SectionCard>

//       {/* ── Post-Sales Information ── */}
//       <SectionCard title="Post-Sales Projects" icon={IconProject}>
//         {postSalesData && postSalesData.length > 0 ? (
//           <div className={styles.postSalesGrid}>
//             {postSalesData.map((postSale) => (
//               <PostSalesItem key={postSale.id} item={postSale} />
//             ))}
//           </div>
//         ) : (
//           <div className={styles.emptyStateInline}>
//             <IconAlertCircle />
//             <p>No post-sales records found</p>
//           </div>
//         )}
//       </SectionCard>

//       {/* ── Summary Section ── */}
//       <div className={styles.summarySection}>
//         <SectionCard title="Invoice Summary">
//           <div className={styles.invoiceSummary}>
//             <div className={styles.invoiceSummaryItem}>
//               <div className={styles.invoiceSummaryLabel}>
//                 Proforma Invoices
//               </div>
//               <div className={styles.invoiceSummaryValue}>
//                 {stats.invoicesCount.proforma}
//               </div>
//             </div>
//             <div className={styles.invoiceSeparator} />
//             <div className={styles.invoiceSummaryItem}>
//               <div className={styles.invoiceSummaryLabel}>Tax Invoices</div>
//               <div className={styles.invoiceSummaryValue}>
//                 {stats.invoicesCount.tax}
//               </div>
//             </div>
//             <div className={styles.invoiceSeparator} />
//             <div className={styles.invoiceSummaryItem}>
//               <div className={styles.invoiceSummaryLabel}>Total</div>
//               <div
//                 className={styles.invoiceSummaryValue}
//                 style={{ color: "#10b981" }}
//               >
//                 {stats.invoicesCount.proforma + stats.invoicesCount.tax}
//               </div>
//             </div>
//           </div>
//         </SectionCard>

//         <SectionCard title="Notification Status">
//           <div className={styles.notificationSummary}>
//             <div className={styles.notificationItem}>
//               <div className={styles.notificationLabel}>Notified Records</div>
//               <div
//                 className={styles.notificationValue}
//                 style={{ color: "#10b981" }}
//               >
//                 {stats.notifiedCount}
//               </div>
//             </div>
//             <div className={styles.notificationSeparator} />
//             <div className={styles.notificationItem}>
//               <div className={styles.notificationLabel}>
//                 Pending Notification
//               </div>
//               <div
//                 className={styles.notificationValue}
//                 style={{ color: "#ef4444" }}
//               >
//                 {stats.totalPostSales - stats.notifiedCount}
//               </div>
//             </div>
//           </div>
//         </SectionCard>
//       </div>
//     </div>
//   );
// }
import React, { useMemo } from "react";
import { useClientProfile } from "../../api/hooks/useClient";
import styles from "./ClientDashboard.module.scss";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPhone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconProject = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconClipboard = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const IconCheckCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconAlertCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconFileText = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="13" x2="8" y2="13" />
    <line x1="12" y1="17" x2="8" y2="17" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Pulse = ({ h = 20, w = "100%", r = 8 }) => (
  <div
    className={styles.pulse}
    style={{ height: h, width: w, borderRadius: r }}
  />
);

// ─── Info Card ────────────────────────────────────────────────────────────────
const InfoCard = ({ icon: Icon, label, value, color = "primary" }) => (
  <div className={`${styles.infoCard} ${styles[color]}`}>
    <div className={styles.infoCardIcon}>
      <Icon />
    </div>
    <div className={styles.infoCardContent}>
      <div className={styles.infoCardLabel}>{label}</div>
      <div className={styles.infoCardValue}>{value || "—"}</div>
    </div>
  </div>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`${styles.sectionCard} ${className}`}>
    <div className={styles.sectionHead}>
      {Icon && <Icon className={styles.sectionIcon} />}
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    <div className={styles.sectionBody}>{children}</div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  PLANNING: { color: "#3b82f6", label: "Planning" },
  IN_PROGRESS: { color: "#f59e0b", label: "In Progress" },
  ON_HOLD: { color: "#ef4444", label: "On Hold" },
  COMPLETED: { color: "#10b981", label: "Completed" },
  CANCELLED: { color: "#6b7280", label: "Cancelled" },
  CREATED: { color: "#8b5cf6", label: "Created" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] || {
    color: "#9ca3af",
    label: status || "Pending",
  };
  return (
    <span
      className={styles.statusBadge}
      style={{
        background: `${cfg.color}18`,
        color: cfg.color,
        borderColor: cfg.color,
      }}
    >
      <span className={styles.statusDot} style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
};

// ─── Pre-Sales Item ───────────────────────────────────────────────────────────
// Data shape from API: { srNumber, dateTime, personName, approachedVia, conclusion,
//                        status, quotations: [{ id, quotationNumber, accepted, sended }] }
const PreSalesItem = ({ item }) => (
  <div className={styles.listItem}>
    <div className={styles.listItemHead}>
      <div className={styles.listItemNumber}>#{item.srNumber}</div>
      <div className={styles.listItemDate}>
        {new Date(item.dateTime).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
    <div className={styles.listItemContent}>
      <div className={styles.listItemField}>
        <span className={styles.fieldLabel}>Contact Person</span>
        <span className={styles.fieldValue}>{item.personName || "—"}</span>
      </div>
      <div className={styles.listItemField}>
        <span className={styles.fieldLabel}>Approached Via</span>
        <span className={styles.fieldValue}>{item.approachedVia || "—"}</span>
      </div>
      <div className={styles.listItemField}>
        <span className={styles.fieldLabel}>Conclusion</span>
        <span className={styles.fieldValue}>{item.conclusion || "—"}</span>
      </div>
      {item.status && (
        <div className={styles.listItemField}>
          <StatusBadge status={item.status} />
        </div>
      )}
    </div>
    {item.quotations && item.quotations.length > 0 && (
      <div className={styles.listItemFooter}>
        <span className={styles.quotationCount}>
          {item.quotations.length} Quotation
          {item.quotations.length !== 1 ? "s" : ""}
          {/* Show accepted count if any */}
          {item.quotations.filter((q) => q.accepted).length > 0 && (
            <> · {item.quotations.filter((q) => q.accepted).length} Accepted</>
          )}
        </span>
      </div>
    )}
  </div>
);

// ─── Post-Sales Item ──────────────────────────────────────────────────────────
// Data shape from API (embedded in clientData.postSales):
// { id, postSalesdateTime, project: { projectId, projectCode, projectName,
//   projectStatus }, proformaInvoices: [], taxInvoices: [],
//   remark, notified, postSalesStatus }
const PostSalesItem = ({ item }) => (
  <div className={styles.postSalesCard}>
    <div className={styles.postSalesHead}>
      <div className={styles.postSalesInfo}>
        <h4 className={styles.postSalesProject}>
          {item.project?.projectName || `Project #${item.project?.projectId}`}
        </h4>
        <div className={styles.postSalesMeta}>
          {item.project?.projectCode && (
            <span className={styles.postSalesId}>
              {item.project.projectCode}
            </span>
          )}
          <span className={styles.postSalesDate}>
            {new Date(item.postSalesdateTime).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <StatusBadge status={item.postSalesStatus} />
    </div>

    <div className={styles.postSalesGridItems}>
      <div className={styles.postSalesGridItem}>
        <span className={styles.postSalesLabel}>Project Status</span>
        <StatusBadge status={item.project?.projectStatus} />
      </div>
      <div className={styles.postSalesGridItem}>
        <span className={styles.postSalesLabel}>Invoices</span>
        <div className={styles.invoiceCount}>
          <span className={styles.invoiceType}>
            Proforma: {item.proformaInvoices?.length ?? 0}
          </span>
          <span className={styles.invoiceType}>
            Tax: {item.taxInvoices?.length ?? 0}
          </span>
        </div>
      </div>
      <div className={styles.postSalesGridItem}>
        <span className={styles.postSalesLabel}>Notified</span>
        <span
          className={styles.notificationStatus}
          style={{ color: item.notified ? "#10b981" : "#ef4444" }}
        >
          {item.notified ? "✓ Yes" : "✗ No"}
        </span>
      </div>
    </div>

    {item.remark && (
      <div className={styles.postSalesRemark}>
        <span className={styles.remarkLabel}>Remark</span>
        <p className={styles.remarkText}>{item.remark}</p>
      </div>
    )}
  </div>
);

// ─── Main Client Dashboard ────────────────────────────────────────────────────
export default function ClientDashboard() {
  // ── Data: single API call GET /api/clients/getclient ─────────────────────
  // Response: { id, name, email, phone, address, pan, gstcertificate,
  //             preSales: [...], postSales: [...] }
  //
  // ✅ Everything (preSales + postSales + invoices) lives inside clientData.
  // ❌ No need for usePostSalesByClient — that was the source of wrong counts.
  const { data: clientData, isLoading, isError } = useClientProfile();

  // ── All data sourced from clientData (single response) ───────────────────
  // clientData.preSales   → PreSalesDTO list
  // clientData.postSales  → PostSalesDTO list (each has proformaInvoices + taxInvoices)
  const preSales = clientData?.preSales ?? [];
  const postSales = clientData?.postSales ?? [];

  // ── Stats — all derived from the single clientData response ───────────────
  const stats = useMemo(() => {
    // Total pre-sales enquiries
    const totalPreSales = preSales.length;

    // Total post-sales records (= total projects linked to this client)
    const totalPostSales = postSales.length;

    // Completed projects: postSales where project.projectStatus === "COMPLETED"
    const completedProjects = postSales.filter(
      (ps) => ps.project?.projectStatus === "COMPLETED",
    ).length;

    // Active/in-progress projects
    const activeProjects = postSales.filter(
      (ps) => ps.project?.projectStatus === "IN_PROGRESS",
    ).length;

    // Total proforma invoices across all post-sales
    const totalProforma = postSales.reduce(
      (sum, ps) => sum + (ps.proformaInvoices?.length ?? 0),
      0,
    );

    // Total tax invoices across all post-sales
    const totalTax = postSales.reduce(
      (sum, ps) => sum + (ps.taxInvoices?.length ?? 0),
      0,
    );

    // Total accepted quotations across all pre-sales
    const acceptedQuotations = preSales.reduce(
      (sum, ps) =>
        sum + (ps.quotations?.filter((q) => q.accepted)?.length ?? 0),
      0,
    );

    // Notified post-sales records
    const notifiedCount = postSales.filter((ps) => ps.notified).length;

    return {
      totalPreSales,
      totalPostSales,
      completedProjects,
      activeProjects,
      totalProforma,
      totalTax,
      totalInvoices: totalProforma + totalTax,
      acceptedQuotations,
      notifiedCount,
      pendingNotification: totalPostSales - notifiedCount,
    };
  }, [preSales, postSales]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.welcomeCard}>
          <Pulse h={40} w={300} />
          <Pulse h={20} w={200} />
        </div>
        <div className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.statCardSkeleton}>
              <Pulse h={50} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (isError || !clientData) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.emptyState}>
          <IconAlertCircle />
          <h2>No Client Data Found</h2>
          <p>Unable to load your profile information</p>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.dashboard}>
      {/* ── Welcome ── */}
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeGreeting}>Welcome back,</div>
          <h1 className={styles.welcomeName}>{clientData.name}</h1>
          <p className={styles.welcomeSubtitle}>
            Manage and track your projects, invoices, and sales information
          </p>
        </div>
      </div>

      {/* ── Stats Grid — 4 cards, all from clientData ── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: "#3b82f6" }}>
            <IconClipboard />
          </div>
          <div className={styles.statContent}>
            {/* ✅ preSales.length from clientData.preSales */}
            <div className={styles.statValue}>{stats.totalPreSales}</div>
            <div className={styles.statLabel}>Enquiries</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: "#f59e0b" }}>
            <IconProject />
          </div>
          <div className={styles.statContent}>
            {/* ✅ postSales.length from clientData.postSales */}
            <div className={styles.statValue}>{stats.totalPostSales}</div>
            <div className={styles.statLabel}>Projects</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: "#10b981" }}>
            <IconCheckCircle />
          </div>
          <div className={styles.statContent}>
            {/* ✅ filtered from clientData.postSales — project.projectStatus */}
            <div className={styles.statValue}>{stats.completedProjects}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: "#8b5cf6" }}>
            <IconFileText />
          </div>
          <div className={styles.statContent}>
            {/* ✅ sum of proformaInvoices + taxInvoices from clientData.postSales */}
            <div className={styles.statValue}>{stats.totalInvoices}</div>
            <div className={styles.statLabel}>Total Invoices</div>
          </div>
        </div>
      </div>

      {/* ── Client Information ── */}
      <SectionCard title="My Information" icon={IconUser}>
        <div className={styles.clientInfoGrid}>
          <InfoCard
            icon={IconUser}
            label="Name"
            value={clientData.name}
            color="primary"
          />
          <InfoCard
            icon={IconMail}
            label="Email"
            value={clientData.email}
            color="info"
          />
          {/* phone comes as Long from backend — convert to string */}
          <InfoCard
            icon={IconPhone}
            label="Phone"
            value={clientData.phone != null ? String(clientData.phone) : "—"}
            color="warning"
          />
          <InfoCard
            icon={IconMapPin}
            label="Address"
            value={clientData.address}
            color="success"
          />
        </div>

        {/* pan + gstcertificate — field names exactly as backend returns */}
        {(clientData.pan || clientData.gstcertificate) && (
          <div className={styles.documentInfo}>
            <h4 className={styles.documentTitle}>Documents</h4>
            <div className={styles.documentGrid}>
              {clientData.pan && (
                <div className={styles.documentItem}>
                  <span className={styles.documentLabel}>PAN</span>
                  <span className={styles.documentValue}>{clientData.pan}</span>
                </div>
              )}
              {clientData.gstcertificate && (
                <div className={styles.documentItem}>
                  <span className={styles.documentLabel}>GST Certificate</span>
                  <span className={styles.documentValue}>
                    {clientData.gstcertificate}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Pre-Sales — from clientData.preSales ── */}
      <SectionCard title="My Enquiries" icon={IconClipboard}>
        {preSales.length > 0 ? (
          <div className={styles.listContainer}>
            {preSales.map((ps, i) => (
              <PreSalesItem key={ps.srNumber ?? i} item={ps} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyStateInline}>
            <IconAlertCircle />
            <p>No enquiry records found</p>
          </div>
        )}
      </SectionCard>

      {/* ── Post-Sales — from clientData.postSales ── */}
      <SectionCard title="My Projects" icon={IconProject}>
        {postSales.length > 0 ? (
          <div className={styles.postSalesGrid}>
            {postSales.map((ps) => (
              <PostSalesItem key={ps.id} item={ps} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyStateInline}>
            <IconAlertCircle />
            <p>No project records found</p>
          </div>
        )}
      </SectionCard>

      {/* ── Summary ── */}
      <div className={styles.summarySection}>
        <SectionCard title="Invoice Summary">
          <div className={styles.invoiceSummary}>
            <div className={styles.invoiceSummaryItem}>
              <div className={styles.invoiceSummaryLabel}>Proforma</div>
              <div className={styles.invoiceSummaryValue}>
                {stats.totalProforma}
              </div>
            </div>
            <div className={styles.invoiceSeparator} />
            <div className={styles.invoiceSummaryItem}>
              <div className={styles.invoiceSummaryLabel}>Tax Invoices</div>
              <div className={styles.invoiceSummaryValue}>{stats.totalTax}</div>
            </div>
            <div className={styles.invoiceSeparator} />
            <div className={styles.invoiceSummaryItem}>
              <div className={styles.invoiceSummaryLabel}>Total</div>
              <div
                className={styles.invoiceSummaryValue}
                style={{ color: "#10b981" }}
              >
                {stats.totalInvoices}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Project Summary">
          <div className={styles.notificationSummary}>
            <div className={styles.notificationItem}>
              <div className={styles.notificationLabel}>Active</div>
              <div
                className={styles.notificationValue}
                style={{ color: "#f59e0b" }}
              >
                {stats.activeProjects}
              </div>
            </div>
            <div className={styles.notificationSeparator} />
            <div className={styles.notificationItem}>
              <div className={styles.notificationLabel}>Completed</div>
              <div
                className={styles.notificationValue}
                style={{ color: "#10b981" }}
              >
                {stats.completedProjects}
              </div>
            </div>
            <div className={styles.notificationSeparator} />
            <div className={styles.notificationItem}>
              <div className={styles.notificationLabel}>Accepted Quotes</div>
              <div
                className={styles.notificationValue}
                style={{ color: "#8b5cf6" }}
              >
                {stats.acceptedQuotations}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
