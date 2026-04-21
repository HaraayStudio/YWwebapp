// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useProjectList } from "../../api/hooks/useProject";
// // import { useMyProjects } from "../../api/hooks/useProject";
// // import styles from "./ManageProjects.module.scss";

// // const PAGE_SIZE = 16;

// // const AllProjects = () => {
// //   const navigate = useNavigate();
// //   const [page, setPage] = useState(0);

// //   const { data: projects = [], isLoading, isError } = useProjectList(page, 16);
// //   const totalPages = projects?.totalPages || 1;

// //   if (isLoading)
// //     return (
// //       <div className={styles.loaderWrapper}>
// //         <div className={styles.spinner} />
// //       </div>
// //     );

// //   if (isError)
// //     return <div className={styles.error}>Failed to load projects</div>;

// //   return (
// //     <div className={styles.pageWrapper}>
// //       {/* Header */}
// //       <div className={styles.header}>
// //         <h1>All Sites</h1>
// //         <p>{projects.length} sites</p>
// //       </div>

// //       {/* Project Grid */}
// //       <div className={styles.projectGrid}>
// //         {projects.map((project) => (
// //           <div
// //             key={project.id}
// //             className={styles.projectCard}
// //             onClick={() => navigate(`/projects/view/${project.projectId}`)}
// //           >
// //             <div className={styles.projectImage}>
// //               {project.logoUrl ? (
// //                 <img src={project.logoUrl} />
// //               ) : (
// //                 <div className={styles.placeholder}>
// //                   {project.projectName?.charAt(0)}
// //                 </div>
// //               )}
// //             </div>

// //             <div className={styles.projectInfo}>
// //               <h3>{project.projectName}</h3>
// //               <span>Site #{project.id}</span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className={styles.pagination}>
// //         <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
// //           Prev
// //         </button>

// //         <span>
// //           Page {page + 1} of {totalPages}
// //         </span>

// //         <button
// //           disabled={page + 1 >= totalPages}
// //           onClick={() => setPage((p) => p + 1)}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllProjects;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProjectList, useMyProjects } from "../../api/hooks/useProject";
// import styles from "./ManageProjects.module.scss";

// const PAGE_SIZE = 16;

// const AllProjects = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const isAdminAccess = [
//     "ADMIN",
//     "CO_FOUNDER",
//     "HR",
//     "SR_ARCHITECT",
//     "JR_ARCHITECT",
//     "SR_ENGINEER",
//     "DRAFTSMAN",
//     "LIAISON_MANAGER",
//     "LIAISON_OFFICER",
//     "LIAISON_ASSISTANT",
//   ].includes(role);

//   // Fetch based on role
//   const {
//     data: allProjects,
//     isLoading: loadingAll,
//     isError: errorAll,
//   } = useProjectList(page, PAGE_SIZE, {
//     enabled: isAdminAccess,
//   });

//   const {
//     data: myProjects,
//     isLoading: loadingMine,
//     isError: errorMine,
//   } = useMyProjects(page, PAGE_SIZE, {
//     enabled: !isAdminAccess,
//   });

//   const projects = isAdminAccess ? allProjects : myProjects;

//   const isLoading = loadingAll || loadingMine;
//   const isError = errorAll || errorMine;

//   const totalPages = projects?.totalPages || 1;
//   const projectList = projects?.content || projects || [];

//   if (isLoading)
//     return (
//       <div className={styles.loaderWrapper}>
//         <div className={styles.spinner} />
//       </div>
//     );

//   if (isError)
//     return <div className={styles.error}>Failed to load projects</div>;

//   return (
//     <div className={styles.pageWrapper}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h1>All Sites</h1>
//         <p>{projectList.length} sites</p>
//       </div>

//       {/* Project Grid */}
//       <div className={styles.projectGrid}>
//         {projectList.map((project) => (
//           <div
//             key={project.id}
//             className={styles.projectCard}
//             onClick={() => navigate(`/projects/view/${project.projectId}`)}
//           >
//             <div className={styles.projectImage}>
//               {project.logoUrl ? (
//                 <img src={project.logoUrl} />
//               ) : (
//                 <div className={styles.placeholder}>
//                   {project.projectName?.charAt(0)}
//                 </div>
//               )}
//             </div>

//             <div className={styles.projectInfo}>
//               <h3>{project.projectName}</h3>
//               <span>Site #{project.id}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
//           Prev
//         </button>

//         <span>
//           Page {page + 1} of {totalPages}
//         </span>

//         <button
//           disabled={page + 1 >= totalPages}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllProjects;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectList, useMyProjects } from "../../api/hooks/useProject";
import styles from "./ManageProjects.module.scss";

const PAGE_SIZE = 16;

const AllProjects = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const isAdminAccess = [
    "ADMIN", "CO_FOUNDER", "HR", "SR_ARCHITECT", "JR_ARCHITECT",
    "SR_ENGINEER", "DRAFTSMAN", "LIAISON_MANAGER", "LIAISON_OFFICER", "LIAISON_ASSISTANT",
  ].includes(role);

  const { data: allProjects, isLoading: loadingAll, isError: errorAll } =
    useProjectList(page, PAGE_SIZE, { enabled: isAdminAccess });

  const { data: myProjects, isLoading: loadingMine, isError: errorMine } =
    useMyProjects(page, PAGE_SIZE, { enabled: !isAdminAccess });

  const projects = isAdminAccess ? allProjects : myProjects;
  const isLoading = loadingAll || loadingMine;
  const isError = errorAll || errorMine;

  const totalPages = projects?.totalPages || 1;
  const projectList = projects?.content || projects || [];

  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.spinner} />
      </div>
    );

  if (isError)
    return <div className={styles.error}>Failed to load projects</div>;

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1>All Sites</h1>
        <p>{projectList.length} sites</p>
      </div>

      {/* Project Grid */}
      <div className={styles.projectGrid}>
        {projectList.map((project) => {
          const displayName = project.projectName || project.clientName || "Unnamed Site";
          const initial = displayName.charAt(0).toUpperCase();

          return (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => navigate(`/projects/view/${project.projectId}`)}
            >
              {/* Image / Avatar */}
              <div className={styles.projectImage}>
                {project.logoUrl ? (
                  <img src={project.logoUrl} alt={displayName} />
                ) : (
                  <div className={styles.placeholder}>{initial}</div>
                )}
              </div>

              {/* Info */}
              <div className={styles.projectInfo}>
                <h3 className={styles.siteName} title={displayName}>
                  {displayName}
                </h3>

                <div className={styles.metaRow}>
                  <span className={styles.badge}>#{project.id}</span>

                  {/* Show client name as secondary label if site name exists */}
                  {project.projectName && project.clientName && (
                    <span className={styles.clientName} title={project.clientName}>
                      {project.clientName}
                    </span>
                  )}

                  {/* If no project name, clarify this is the client name */}
                  {!project.projectName && project.clientName && (
                    <span className={styles.clientTag}>Client</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProjects;