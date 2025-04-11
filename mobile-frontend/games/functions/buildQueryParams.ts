import { GameQueryFilter } from "../types";

export const buildQueryParams = (filters: GameQueryFilter[]): string => {
    const params = new URLSearchParams();

    for (const filter of filters) {
        if (Array.isArray(filter.value)) {
            for (const val of filter.value) {
                params.append(filter.key, String(val));
            }
        } else {
            params.append(filter.key, String(filter.value));
        }
    }

    return params.toString();
}