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
