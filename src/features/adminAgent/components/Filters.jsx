import {
  FilterBar,
  SearchBar,
} from "../../../shared/components";

export default function Filters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  countyFilter,
  setCountyFilter,
  applications,
}) {
  const counties = [
    ...new Set(
      applications
        .map((a) => a.county)
        .filter(Boolean)
    ),
  ].sort();

  return (
    <div className="agent-filters">
      <SearchBar
        className="agent-search-box"
        placeholder="Search applicant..."
        value={search}
        onChange={setSearch}
      />

      <FilterBar
        filters={[
          {
            name: "statusFilter",
            label: "Status",
            placeholder: "All Status",
            options: [
              { value: "all", label: "All Status" },
              { value: "submitted", label: "Submitted" },
              { value: "under_review", label: "Under Review" },
              {
                value: "information_requested",
                label: "Information Requested",
              },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ],
          },
          {
            name: "countyFilter",
            label: "County",
            placeholder: "All Counties",
            options: [
              { value: "all", label: "All Counties" },
              ...counties.map((county) => ({
                value: county,
                label: county,
              })),
            ],
          },
        ]}
        values={{ statusFilter, countyFilter }}
        onChange={(values) => {
          setStatusFilter(values.statusFilter);
          setCountyFilter(values.countyFilter);
        }}
      />
    </div>
  );
}
