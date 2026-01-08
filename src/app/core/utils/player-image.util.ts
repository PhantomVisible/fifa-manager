export const getPlayerImageUrl = (sofifaId: number): string => {
    if (!sofifaId) return '';

    // Format ID to 6 digits with leading zeros
    const idStr = sofifaId.toString().padStart(6, '0');

    // Split into 3 parts of 2 digits (e.g., 158023 -> 158/023)
    const p1 = idStr.substring(0, 3);
    const p2 = idStr.substring(3, 6);

    return `/player-images/${p1}/${p2}/21_120.png`;
};
