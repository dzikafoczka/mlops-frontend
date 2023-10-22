export const DatasetInfo = [
    {
        field: "dataset.name",
        headerName: "Dataset Name",
        cellRenderer: (val: any) => {
            if (val.data["dataset"] && val.data["dataset"]["name"]) {
                return (
                    <a href={"/datasets"} target={"_blank"}>
                        {val.data["dataset"]["name"]}
                    </a>
                );
            }
            return "-";
        },
    },
    {
        field: "dataset.version",
        headerName: "Version",
        cellRenderer: (val: any) => {
            if (val.data["dataset"] && val.data["dataset"]["version"]) {
                return val.data["dataset"]["version"];
            }
            return "-";
        },
    },
];
