import Pin from "@/components/icons/pin";
import PinFilled from "@/components/icons/pin-filled";
import { backendConfig } from "@/config/backend";
import { useData } from "@/hooks/use-data-hook";
import { createToast } from "@/lib/toast";
import { Project } from "@/types/project";
import { ProjectQuickAction } from "@/types/types";
import axios from "axios";

const PinUnpinProjectMenuItem = ({ project, setLoading, ItemType }: ProjectQuickAction) => {

    const { url, port } = backendConfig;

    const data = useData();

    const handlePinUnpinProject = async (action: "pin" | "unpin") => {
        setLoading(true);
        await axios
            .put(`${url}:${port}/projects/${project._id}`, {
                pinned: action === "pin" ? true : false,
            })
            .then(() => {
                data.updateProject(project._id, {
                    ...project,
                    pinned: action === "pin" ? true : false,
                } as Project);
            })
            .catch((error: any) => {
                createToast({
                    id: "pin-unpin-project",
                    message: error.response?.data.detail,
                    type: "error",
                });
            });
        setLoading(false);
    };

    return (
        <>
            {project.pinned ? (
                <ItemType
                    onClick={() => handlePinUnpinProject("unpin")}
                >
                    <div className="flex items-center">
                        <PinFilled className="flex-shrink-0 w-5 h-5 mr-2 dark:text-[#D5D5D5]" />
                        Unpin project
                    </div>
                </ItemType>
            ) : (
                <ItemType onClick={() => handlePinUnpinProject("pin")}>
                    <div className="flex items-center">
                        <Pin className="flex-shrink-0 w-5 h-5 mr-2 dark:text-[#D5D5D5]" />
                        Pin project
                    </div>
                </ItemType>
            )}
        </>
    );
};

export default PinUnpinProjectMenuItem;
