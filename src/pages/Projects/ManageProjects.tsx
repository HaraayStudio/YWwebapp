import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectList } from "../../api/hooks/useProject";
import styles from "./ManageProjects.module.scss";

const PAGE_SIZE = 16;

const AllProjects = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  // const { data, isLoading, isError } = useProjectList(page, PAGE_SIZE);

  const { data: projects = [], isLoading, isError } = useProjectList(page, 16);
  const totalPages = projects?.totalPages || 1;

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
        <p>{projects.length} sites</p>
      </div>

      {/* Project Grid */}
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onClick={() => navigate(`/projects/view/${project.projectId}`)}
          >
            <div className={styles.projectImage}>
              {project.logoUrl ? (
                <img src={project.logoUrl} />
              ) : (
                <div className={styles.placeholder}>
                  {project.projectName?.charAt(0)}
                </div>
              )}
            </div>

            <div className={styles.projectInfo}>
              <h3>{project.projectName}</h3>
              <span>Site #{project.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

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
