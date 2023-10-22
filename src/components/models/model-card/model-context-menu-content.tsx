import { Archive, Delete, Unarchive, Edit } from "@/components/icons";

import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import ProjectMenuHeader from "./model-menu/model-menu-header";

import CopyModelIdMenuItem from "./model-menu/copy-model-id-menu-item";
import { Model } from "@/types/model";
import ModalModelMenuItem from "./model-menu/modal-model-menu-item";
import { ModelStatus } from "@/types/types";

interface ModelCardProps {
    model: Model;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelContextMenuContent = ({ model, setLoading }: ModelCardProps) => {
    return (
        <ContextMenuContent className="w-56">
            <ProjectMenuHeader />
            <ContextMenuSeparator />
            {model.model_status !== ModelStatus.ARCHIVED && (
                <ModalModelMenuItem
                    model={model}
                    ItemType={ContextMenuItem}
                    modalType="editModel"
                    Icon={Edit}
                    menuDescription="Edit model information"
                />
            )}
            <ModalModelMenuItem
                model={model}
                ItemType={ContextMenuItem}
                modalType="deleteModel"
                Icon={Delete}
                menuDescription="Delete model"
            />
            <ContextMenuSeparator />
            {model.model_status === ModelStatus.ARCHIVED ? (
                <ModalModelMenuItem
                    model={model}
                    ItemType={ContextMenuItem}
                    modalType="restoreModel"
                    Icon={Delete}
                    menuDescription="Restore model"
                />
            ) : (
                <ModalModelMenuItem
                    model={model}
                    ItemType={ContextMenuItem}
                    modalType="archiveModel"
                    Icon={Delete}
                    menuDescription="Archive model"
                />
            )}
            {/* <ProjectStatusMenuItem
                project={project}
                setLoading={setLoading}
                ItemType={{
                    MenuSub: ContextMenuSub,
                    Trigger: ContextMenuSubTrigger,
                    MenuSubContent: ContextMenuSubContent,
                    MenuItem: ContextMenuItem,
                }}
            /> */}
            <ContextMenuSeparator />
            {/* <PinUnpinProjectMenuItem
                project={project}
                setLoading={setLoading}
                ItemType={ContextMenuItem}
            /> */}
            <ContextMenuSeparator />
            <CopyModelIdMenuItem model={model} ItemType={ContextMenuItem} />
        </ContextMenuContent>
    );
};

export default ModelContextMenuContent;
