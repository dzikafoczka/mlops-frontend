import { Project } from "@/types/project";
import { type ClassValue, clsx } from "clsx";
import { LoremIpsum } from "lorem-ipsum";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const numberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const lorem = new LoremIpsum({
    wordsPerSentence: {
        max: 6,
        min: 2,
    },
});

export const sortProjectComparator = (
    p1: Project,
    p2: Project,
    method: string
) => {
    switch (method) {
        case "AZ":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return p1.title.localeCompare(p2.title);
        case "ZA":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return -1 * p1.title.localeCompare(p2.title);
        case "UDESC":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return p1.updated_at < p2.updated_at ? 1 : -1;
        case "UASC":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return p1.updated_at > p2.updated_at ? 1 : -1;
        case "CDESC":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return p1.created_at < p2.created_at ? 1 : -1;
        case "CASC":
            if (p1.pinned && !p2.pinned) return -1;
            if (!p1.pinned && p2.pinned) return 1;
            return p1.created_at > p2.created_at ? 1 : -1;
        default:
            return 0;
    }
};
