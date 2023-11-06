exports.getJobCardSql = () => {
  return `
        SELECT
            j.id,
            j.jobcard_no,
            j.client,
            j.sales_person,
            j.raised_date,
            j.subject,
            fn_get_status(j.id) as status,
            fn_get_cummulative_hours(j.id) as cumulative_hours
        FROM 
            jobcards j
        ORDER BY
            j.created_at DESC;
    `;
};

exports.getTasksByStatus = () => {
  return `
        SELECT
            t.id,
            j.jobcard_no,
            j.subject,
            t.department_id,
            t.status,
            d.name as department_name,
            fn_get_assigned_hrs(j.id,t.department_id) as assigned_hrs
        FROM  jobcards j join jobcardtasks t on j.id = t.jobcard_id
              join departments d on t.department_id = d.id
        WHERE t.status = ? `;
};
